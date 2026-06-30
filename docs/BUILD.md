# Building TorrServer

## Prerequisites

The default build mode runs goreleaser inside a Docker container, so only two tools are required on the host:

- **make**
- **Docker** — must be capable of running `linux/amd64` containers

> **Why amd64 only?** The Android NDK only ships prebuilt toolchains for `x86_64` Linux. All goreleaser-based builds (including desktop binaries) run inside the same builder image, so the container host must be able to execute `linux/amd64` workloads.

---

## Docker setup

### Linux

Any standard Docker installation works. Run the following to enable multi-platform image support:

```sh
docker run --privileged --rm tonistiigi/binfmt --install all
```

### macOS

This guide covers setup using [Colima](https://github.com/abiosoft/colima).

```sh
brew install docker
brew install docker-buildx
brew install qemu
brew install colima
brew install lima-additional-guestagents
```

Start a Colima profile with Rosetta 2 translation (enables fast amd64 emulation on Apple Silicon):

```sh
colima start --profile rosetta \
  --cpu 4 --memory 8 --disk 100 \
  --arch aarch64 --vm-type=vz --vz-rosetta
```

Then install the `binfmt` emulation layer and verify buildx:

```sh
docker run --privileged --rm tonistiigi/binfmt --install all
```

> The `rosetta` profile name is arbitrary — use any name you like. Adjust `--cpu`, `--memory`, and `--disk` to suit your machine.

> **Note:** Without the `binfmt` step above, building `linux/arm/v7` images will fail. Two constraints make emulation necessary for that target: the Android NDK only ships an `x86_64` Linux toolchain, and `linux/arm/v7` is a 32-bit architecture that Apple Silicon cannot execute natively (Rosetta 2 translates x86_64, not 32-bit ARM). The `binfmt` install covers both cases.

---

## Building

```sh
# Build binary for the host platform (default target)
make

# Build binary for the host platform with GStreamer support
make gst

# Build Android binary (GOARCH and GOARM are required)
make android GOARCH=arm GOARM=7

# Build all platform binaries (snapshot, no publish)
make dist

# Cut a real release
make release
```

Run `make help` for the full list of targets and options.

---


## Cross-compiling

The `binary` target respects the standard Go platform variables. Override them to build for a different target:

```sh
# Linux amd64 on any host
make GOOS=linux GOARCH=amd64

# Linux arm64
make GOOS=linux GOARCH=arm64

# Linux ARMv7 (e.g. for Raspberry Pi 2/3 in 32-bit mode)
make GOOS=linux GOARCH=arm GOARM=7

# Linux ARMv6
make GOOS=linux GOARCH=arm GOARM=6

# Windows amd64
make GOOS=windows GOARCH=amd64
```

In container mode (the default) the variables are forwarded into the builder via `-e` flags, so no local Go toolchain is required. In `USE_LOCAL_TOOLS=1` mode your host Go toolchain must support the target, which it does for all tier-1 GOOS/GOARCH combinations.

## Local tools mode (`USE_LOCAL_TOOLS=1`)

If you prefer to run goreleaser directly on the host rather than inside Docker, install the following tools and set `USE_LOCAL_TOOLS=1`.

You can export it once for your shell session so you don't have to repeat it on every call:

```sh
export USE_LOCAL_TOOLS=1
make                          # USE_LOCAL_TOOLS is picked up automatically
make android GOARCH=arm64
make dist
```

Or pass it inline for a single invocation:

```sh
make USE_LOCAL_TOOLS=1
```

### Required tools

| Tool | Purpose | Install |
|------|---------|---------|
| [goreleaser](https://goreleaser.com/getting-started/install/oss/) | Build & release automation | See link |
| [swag](https://github.com/swaggo/swag) | Swagger / OpenAPI doc generation | `go install github.com/swaggo/swag/cmd/swag@latest` |
| [upx](https://upx.github.io) | Binary compression | `brew install upx` / `apt install upx` |
| [yarn](https://yarnpkg.com/getting-started/install) | Web asset bundling (`make webgen`) | See link |

To skip optional tools without installing them:

```sh
make USE_LOCAL_TOOLS=1 SKIP_UPX=1        # skip UPX compression
make USE_LOCAL_TOOLS=1 SKIP_BEFORE=1     # skip goreleaser before hooks
```

### Android builds (local mode)

Android builds require `GOARCH` and `GOARM` to be set explicitly — without them goreleaser cannot select a target and will produce no binary.

Android builds additionally require the Android SDK command-line tools and NDK.

1. Download the [Android command-line tools](https://developer.android.com/tools#tools-sdk) and unzip them under `$ANDROID_HOME/cmdline-tools/latest`.
2. Install the NDK via [`sdkmanager`](https://developer.android.com/tools/sdkmanager):

```sh
sdkmanager "ndk;27.0.12077973"
```

3. Set `ANDROID_NDK_LATEST_HOME` to point at the installed NDK, or override `NDK_TOOLCHAIN` directly:

```sh
export ANDROID_NDK_LATEST_HOME=$ANDROID_HOME/ndk/27.0.12077973
make android GOARCH=arm64 USE_LOCAL_TOOLS=1          # arm64
make android GOARCH=arm GOARM=7 USE_LOCAL_TOOLS=1    # ARMv7
```

Or with the variable exported:

```sh
export USE_LOCAL_TOOLS=1
make android GOARCH=arm64
make android GOARCH=arm GOARM=7
```
