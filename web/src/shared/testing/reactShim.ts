/**
 * Minimal hook runtime for node-env tests (no DOM, no react-test-renderer).
 * `vi.mock('react', () => import('shared/testing/reactShim'))`, then drive a hook
 * with `renderHook`. State setters write the cell; call `rerender()` to read it.
 * Effects run after each render when their deps changed; cleanups run before the
 * next run and on `unmount`.
 */

interface EffectSlot {
  deps?: readonly unknown[]
  cleanup?: void | (() => void)
}

interface Instance {
  cells: unknown[]
  effects: EffectSlot[]
}

let current: Instance | null = null
let cursor = 0
let pending: { slot: EffectSlot; run: () => void | (() => void) }[] = []

const depsChanged = (a?: readonly unknown[], b?: readonly unknown[]) =>
  !a || !b || a.length !== b.length || a.some((v, i) => !Object.is(v, b[i]))

const active = (): Instance => {
  if (!current) throw new Error('hook called outside renderHook')
  return current
}

export function useState<T>(init: T | (() => T)): [T, (next: T | ((prev: T) => T)) => void] {
  const inst = active()
  const i = cursor++
  if (!(i in inst.cells)) inst.cells[i] = typeof init === 'function' ? (init as () => T)() : init
  const set = (next: T | ((prev: T) => T)) => {
    inst.cells[i] = typeof next === 'function' ? (next as (prev: T) => T)(inst.cells[i] as T) : next
  }
  return [inst.cells[i] as T, set]
}

export function useRef<T>(init: T): { current: T } {
  const inst = active()
  const i = cursor++
  if (!(i in inst.cells)) inst.cells[i] = { current: init }
  return inst.cells[i] as { current: T }
}

export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T {
  const inst = active()
  const i = cursor++
  const prev = inst.cells[i] as { deps: readonly unknown[]; value: T } | undefined
  if (prev && !depsChanged(prev.deps, deps)) return prev.value
  const next = { deps, value: factory() }
  inst.cells[i] = next
  return next.value
}

export function useCallback<T>(fn: T, deps: readonly unknown[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- this is the shim: deps are the caller's
  return useMemo(() => fn, deps)
}

export function useEffect(run: () => void | (() => void), deps?: readonly unknown[]): void {
  const inst = active()
  const i = cursor++
  const slot = (inst.effects[i] ??= {})
  if (slot.deps && !depsChanged(slot.deps, deps)) return
  pending.push({
    slot,
    run: () => {
      slot.deps = deps
      return run()
    },
  })
}

export function renderHook<R>(hook: () => R) {
  const inst: Instance = { cells: [], effects: [] }
  let result!: R
  const render = () => {
    current = inst
    cursor = 0
    pending = []
    try {
      result = hook()
    } finally {
      current = null
    }
    const queued = pending
    pending = []
    for (const { slot, run } of queued) {
      if (typeof slot.cleanup === 'function') slot.cleanup()
      slot.cleanup = run()
    }
  }
  render()
  return {
    get result() {
      return result
    },
    rerender: render,
    unmount() {
      for (const slot of inst.effects) {
        if (typeof slot?.cleanup === 'function') slot.cleanup()
        if (slot) slot.cleanup = undefined
      }
    },
  }
}

export default { useState, useRef, useMemo, useCallback, useEffect }
