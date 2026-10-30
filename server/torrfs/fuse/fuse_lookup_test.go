//go:build !windows && !ios

package fuse

import (
	"context"
	"os"
	"syscall"
	"testing"
	"testing/fstest"

	"github.com/hanwen/go-fuse/v2/fs"
	gofuse "github.com/hanwen/go-fuse/v2/fuse"
)

// attached builds the go-fuse inode bridge in memory (no kernel, no mount), so
// NewInode works inside Lookup.
func attached(t *testing.T, root fs.InodeEmbedder) {
	t.Helper()
	fs.NewNodeFS(root, &fs.Options{})
}

// lookupTree is a MapFS: like torrfs it reports fs.ErrNotExist, which errno
// maps to ENOENT (os.DirFS reports a raw syscall error and gets EIO).
func lookupTree(t *testing.T) *FuseFS {
	t.Helper()
	tree := fstest.MapFS{"Season 1/e1.mkv": {Data: []byte("12345"), Mode: 0o644}}
	ffs := &FuseFS{tfs: tree, p: "."}
	attached(t, ffs)
	return ffs
}

func TestRootLookupFillsEntryAndAttrs(t *testing.T) {
	ctx := context.Background()
	ffs := lookupTree(t)

	var out gofuse.EntryOut
	ch, errno := ffs.Lookup(ctx, "Season 1", &out)
	if errno != 0 || ch == nil {
		t.Fatalf("lookup dir: %v", errno)
	}
	if out.Mode&gofuse.S_IFDIR == 0 {
		t.Errorf("mode %o is not a directory", out.Mode)
	}
	if out.EntryValid != 1 || out.AttrValid != 1 || out.EntryValidNsec != 0 || out.AttrValidNsec != 0 {
		t.Errorf("validity: %+v", out)
	}
	if ch.Mode()&syscall.S_IFMT != syscall.S_IFDIR {
		t.Errorf("inode mode %o", ch.Mode())
	}
	node, ok := ch.Operations().(*tfsNode)
	if !ok || node.p != "Season 1" {
		t.Fatalf("child node %#v", ch.Operations())
	}

	// A nested lookup goes through tfsNode.Lookup and joins the parent path.
	var out2 gofuse.EntryOut
	fch, errno := node.Lookup(ctx, "e1.mkv", &out2)
	if errno != 0 || fch == nil {
		t.Fatalf("lookup file: %v", errno)
	}
	if out2.Size != 5 || out2.Mode&gofuse.S_IFREG == 0 {
		t.Errorf("file attrs: size=%d mode=%o", out2.Size, out2.Mode)
	}
	fnode := fch.Operations().(*tfsNode)
	if fnode.p != "Season 1/e1.mkv" {
		t.Errorf("path %q", fnode.p)
	}
}

func TestLookupErrorsMapToErrno(t *testing.T) {
	ctx := context.Background()
	ffs := lookupTree(t)
	node := &tfsNode{tfs: ffs.tfs, p: "Season 1"}
	attached(t, node)

	if ch, errno := ffs.Lookup(ctx, "missing", &gofuse.EntryOut{}); ch != nil || errno != syscall.ENOENT {
		t.Errorf("root missing: %v %v", ch, errno)
	}
	if ch, errno := node.Lookup(ctx, "missing", &gofuse.EntryOut{}); ch != nil || errno != syscall.ENOENT {
		t.Errorf("child missing: %v %v", ch, errno)
	}
	// ".." in a name must not resolve to anything outside the tree.
	if ch, errno := ffs.Lookup(ctx, "../etc", &gofuse.EntryOut{}); ch != nil || errno == 0 {
		t.Errorf("escape accepted: %v %v", ch, errno)
	}
	if ch, errno := node.Lookup(ctx, "../../x", &gofuse.EntryOut{}); ch != nil || errno == 0 {
		t.Errorf("escape accepted: %v %v", ch, errno)
	}
}

func TestUnmountResetsStateWithoutKernel(t *testing.T) {
	ffs := NewFuseFS()
	ffs.enabled = true
	ffs.mountPath = "/mnt/ts"
	ffs.p = "."
	ffs.tfs = os.DirFS(t.TempDir())
	ffs.server = &gofuse.Server{} // empty mount point: Unmount is a no-op, no syscalls

	if got := ffs.GetMountPath(); got != "/mnt/ts" {
		t.Fatalf("mount path %q", got)
	}
	if err := ffs.Unmount(); err != nil {
		t.Fatal(err)
	}
	if ffs.enabled || ffs.server != nil || ffs.tfs != nil || ffs.p != "" || ffs.GetMountPath() != "" {
		t.Fatalf("state not reset: %+v", ffs)
	}
	if err := ffs.Unmount(); err == nil || err.Error() != "FUSE filesystem is not mounted" {
		t.Fatalf("second unmount: %v", err)
	}
}

func TestFuseCleanupUnmountsOnlyWhenMounted(t *testing.T) {
	fuseMutex.Lock()
	prev := globalFuseFS
	globalFuseFS = nil
	fuseMutex.Unlock()
	t.Cleanup(func() {
		fuseMutex.Lock()
		globalFuseFS = prev
		fuseMutex.Unlock()
	})

	FuseCleanup() // not mounted: nothing to do, must not panic
	g := GetFuseFS()
	if GetFuseFS() != g {
		t.Fatal("GetFuseFS must return the singleton")
	}

	g.enabled = true
	g.mountPath = "/mnt/ts"
	g.server = &gofuse.Server{}
	FuseCleanup()
	if g.enabled || g.GetMountPath() != "" {
		t.Fatalf("cleanup did not unmount: %+v", g)
	}
}

func TestOnAddDefaultsPath(t *testing.T) {
	ffs := &FuseFS{}
	ffs.OnAdd(context.Background())
	if ffs.p != "." {
		t.Fatalf("p = %q", ffs.p)
	}
	ffs.p = "keep"
	ffs.OnAdd(context.Background())
	if ffs.p != "keep" {
		t.Fatalf("OnAdd overwrote p: %q", ffs.p)
	}
	if ffs.EmbeddedInode() != &ffs.Inode {
		t.Fatal("EmbeddedInode must return the embedded inode")
	}
}
