PROJECT_NAME := torrserver

# ── Host platform ─────────────────────────────────────────────────────────────
GO_BINARY         ?= go
GO_ANDROID_BINARY ?= $(GO_BINARY)
GOOS              ?= $(shell go env GOOS)
GOARCH            ?= $(shell go env GOARCH)
GOARM             ?= $(shell go env GOARM)
NDK_TOOLCHAIN     ?= $(ANDROID_NDK_LATEST_HOME)/toolchains/llvm/prebuilt/linux-x86_64

# ── Install paths ─────────────────────────────────────────────────────────────
DATA_DIR ?= $(CURDIR)/data

# Binary name produced by goreleaser:
#   {{ .ProjectName }}-{{ .Os }}-{{ if eq .Arch "arm" }}arm{{ .Arm }}{{ else }}{{ .Arch }}{{ end }}
GOARM_SUFFIX := $(if $(filter arm,$(GOARCH)),$(GOARM),)
DIST_BINARY  := dist/$(PROJECT_NAME)-$(GOOS)-$(GOARCH)$(GOARM_SUFFIX)

# ── Docker ────────────────────────────────────────────────────────────────────
DOCKER_IMAGE_ID := $(PROJECT_NAME)
IMAGE_BUILDER   := $(PROJECT_NAME).builder

# ── Go build cache ────────────────────────────────────────────────────────────
CACHE_DIR      := $(CURDIR)/.cache
CACHE_GO_MOD   := $(CACHE_DIR)/go-mod
CACHE_GO_BUILD := $(CACHE_DIR)/go-build

# ── Goreleaser flags ──────────────────────────────────────────────────────────
GORELEASER_COMMON_FLAGS := --verbose --clean
GORELEASER_BUILD_FLAGS  := --snapshot --single-target

# ── Goreleaser feature flags ──────────────────────────────────────────────────
UPX_ENABLED      := $(if $(SKIP_UPX),false,true)
SKIP_BEFORE_FLAG := $(if $(SKIP_BEFORE),--skip=before,)

# ── Goreleaser: container (default) or local (USE_LOCAL_TOOLS=1) ──────────────
GORELEASER_ENVS := \
	GO_BINARY=$(GO_BINARY) \
	GO_ANDROID_BINARY=$(GO_ANDROID_BINARY) \
	DOCKER_IMAGE_ID=$(DOCKER_IMAGE_ID) \
	UPX_ENABLED=$(UPX_ENABLED)

ifdef USE_LOCAL_TOOLS

# NDK_TOOLCHAIN is only needed locally — the builder image sets it via ENV.
GORELEASER_RUN := env $(GORELEASER_ENVS) NDK_TOOLCHAIN=$(NDK_TOOLCHAIN) goreleaser

else

GORELEASER_RUN = docker run --platform=linux/amd64 --rm \
	$(foreach v,$(GORELEASER_ENVS),-e $(v)) \
	-v $(CURDIR):/go/src/app \
	-v $(CACHE_GO_MOD):/go/pkg/mod \
	-v $(CACHE_GO_BUILD):/root/.cache/go-build \
	-w /go/src/app

endif

# ── Guards ────────────────────────────────────────────────────────────────────

guard-docker-amd64:
ifndef USE_LOCAL_TOOLS
	@docker run --rm --platform=linux/amd64 alpine uname -m >/dev/null 2>&1 || { \
		echo "\033[31mError: Docker cannot run linux/amd64 containers on this host.\033[0m"; \
		echo "Please read docs/BUILD.md"; \
		exit 1; }
endif

guard-goreleaser:
ifdef USE_LOCAL_TOOLS
	@command -v goreleaser >/dev/null 2>&1 || { \
		echo "\033[31mError: 'goreleaser' not found.\033[0m"; \
		echo "Please read docs/BUILD.md"; \
		exit 1; }
endif

guard-upx:
ifdef USE_LOCAL_TOOLS
ifndef SKIP_UPX
	@command -v upx >/dev/null 2>&1 || { \
		echo "\033[31mError: 'upx' not found.\033[0m"; \
		echo "Please read docs/BUILD.md"; \
		exit 1; }
endif
endif

guard-ndk:
ifdef USE_LOCAL_TOOLS
	@test -d "$(NDK_TOOLCHAIN)" || { \
		echo "\033[31mError: Android NDK toolchain not found at $(NDK_TOOLCHAIN)\033[0m"; \
		echo "Set ANDROID_NDK_LATEST_HOME or NDK_TOOLCHAIN to the correct path."; \
		exit 1; }
endif

guard-yarn:
	@command -v yarn >/dev/null 2>&1 || { \
		echo "\033[31mError: 'yarn' not found.\033[0m"; \
		echo "Please read docs/BUILD.md"; \
		exit 1; }

guard-swag:
	@command -v swag >/dev/null 2>&1 || { \
		echo "\033[31mError: 'swag' not found.\033[0m"; \
		echo "Please read docs/BUILD.md"; \
		exit 1; }

# ── Setup: builder image + caches ─────────────────────────────────────────────

setup-builder: guard-docker-amd64
	@docker image inspect $(IMAGE_BUILDER) >/dev/null 2>&1 || \
		docker build --platform=linux/amd64 -t $(IMAGE_BUILDER) -f Dockerfile.builder .

$(CACHE_GO_MOD) $(CACHE_GO_BUILD):
	mkdir -p $@

setup-cache: $(CACHE_GO_MOD) $(CACHE_GO_BUILD)

# ── Shared prerequisites for goreleaser targets ───────────────────────────────
prereqs = guard-goreleaser guard-upx setup-cache
ifndef USE_LOCAL_TOOLS
prereqs += setup-builder
endif

# ── Public targets ────────────────────────────────────────────────────────────

.DEFAULT_GOAL := binary

binary: $(prereqs)
	@echo "Building binary  GOOS=$(GOOS)  GOARCH=$(GOARCH)  GOARM=$(GOARM)..."
	$(GORELEASER_RUN) \
		$(if $(USE_LOCAL_TOOLS),, \
			-e GOOS=$(GOOS) -e GOARCH=$(GOARCH) -e GOARM=$(GOARM) \
			$(IMAGE_BUILDER)) \
		build $(GORELEASER_COMMON_FLAGS) $(GORELEASER_BUILD_FLAGS) $(SKIP_BEFORE_FLAG) \
		--id=binary

android: $(prereqs) guard-ndk
	@echo "Building Android binary  GOARCH=$(GOARCH)  GOARM=$(GOARM)..."
	GOOS=android $(GORELEASER_RUN) \
		$(if $(USE_LOCAL_TOOLS),, \
			-e GOOS=android -e GOARCH=$(GOARCH) -e GOARM=$(GOARM) \
			$(IMAGE_BUILDER)) \
		build $(GORELEASER_COMMON_FLAGS) $(GORELEASER_BUILD_FLAGS) $(SKIP_BEFORE_FLAG) \
		--id=binary-android

# dist delegates to release adding --snapshot (dry-run, no publish).
dist: GORELEASER_EXTRA_FLAGS = --snapshot
dist: release

release: $(prereqs) guard-ndk
	@echo "Releasing$(if $(GORELEASER_EXTRA_FLAGS), (snapshot),)..."
	$(GORELEASER_RUN) \
		$(if $(USE_LOCAL_TOOLS),, \
			-v /var/run/docker.sock:/var/run/docker.sock \
			$(IMAGE_BUILDER)) \
		release $(GORELEASER_COMMON_FLAGS) $(SKIP_BEFORE_FLAG) $(GORELEASER_EXTRA_FLAGS)

# Builds on the native platform — no linux/amd64 emulation required.
docker:
	@echo "Building docker image tag=$(DOCKER_IMAGE_ID)..."
	docker buildx build \
		--load \
		-t $(DOCKER_IMAGE_ID) \
		--build-arg TARGETPLATFORM=dist \
		--build-arg TARGETARCH=$(DOCKER_ARCH)$(if $(DOCKER_VARIANT),$(DOCKER_VARIANT),) \
		.

install:
	@test -f "$(DIST_BINARY)" || { \
		echo "\033[31mError: binary not found at $(DIST_BINARY)\033[0m"; \
		echo "Run 'make binary' first."; \
		exit 1; }
	@echo "Installing $(DIST_BINARY) → $(DATA_DIR)/$(PROJECT_NAME)..."
	@mkdir -p $(DATA_DIR)/torrents
	@cp $(DIST_BINARY) $(DATA_DIR)/$(PROJECT_NAME)
	@chmod +x $(DATA_DIR)/$(PROJECT_NAME)
	@echo "Done. Data directory: $(DATA_DIR)"

webgen: guard-yarn
	go run gen_web.go $(WEBGEN_EXTRA_FLAGS)

webgen-clean: WEBGEN_EXTRA_FLAGS = --clean
webgen-clean: webgen

swag: guard-swag
	cd server && swag init -g web/server.go

run:
	cd server && CGO_ENABLED=0 go run -tags nosqlite ./cmd

clean:
	rm -rf dist web/build

clean-cache:
	rm -rf $(CACHE_DIR)

help:
	@echo ""
	@echo "Usage: make [target] [OPTIONS]"
	@echo ""
	@echo "  binary       Build binary for host platform  (default)"
	@echo "  android      Build Android binary"
	@echo "  dist         Snapshot of all platform binaries"
	@echo "  release      Real release via goreleaser"
	@echo "  docker       Build local docker image"
	@echo "  install      Create DATA_DIR and copy binary there"
	@echo "  webgen       Build web assets and embed them"
	@echo "  webgen-clean Same, but clean previously embedded assets first"
	@echo "  swag         Regenerate swagger API docs"
	@echo "  run          Run the application locally"
	@echo "  clean        Remove build outputs (dist, web/build)"
	@echo "  clean-cache  Remove Go build caches"
	@echo ""
	@echo "Options:"
	@echo "  USE_LOCAL_TOOLS=1        Use host goreleaser instead of Docker builder"
	@echo "  SKIP_UPX=1               Skip UPX compression     (UPX_ENABLED=false env var)"
	@echo "  SKIP_BEFORE=1            Skip goreleaser before hooks  (--skip=before)"
	@echo "  GOOS / GOARCH / GOARM   Override target platform         (binary)"
	@echo "  DOCKER_IMAGE_ID=tag     Override docker image tag"
	@echo "  DATA_DIR=path           Install destination              (default: ./data)"
	@echo "  NDK_TOOLCHAIN=path      Override Android NDK toolchain path"
	@echo ""

.PHONY: binary android dist release docker install \
        webgen webgen-clean swag run clean clean-cache help \
        setup-builder setup-cache \
        guard-docker-amd64 guard-goreleaser guard-upx guard-ndk guard-yarn guard-swag
