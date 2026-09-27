import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import type { ReadonlyRef, Ref } from '../types';

type Cleanup = () => void;

interface WatchEntry {
    source: () => unknown;
    callback: (value: unknown, previous: unknown) => void;
    previous: unknown;
    pendingImmediate: boolean;
}

export interface WatchOptions {
    immediate?: boolean;
}

/**
 * Reactive primitives available while a component setup function runs once.
 * Writing a `ref` value re-renders the owning component.
 */
export interface SetupScope {
    ref<T>(initial: T): Ref<T>;
    reactive<T extends object>(initial: T): T;
    watch<T>(
        source: () => T,
        callback: (value: T, previous: T) => void,
        options?: WatchOptions,
    ): void;
    onMounted(callback: () => void): void;
    onBeforeUnmount(callback: () => void): void;
    nextTick(): Promise<void>;
}

interface SetupInstance<T> {
    result: T;
    flushTicks(): void;
    runWatchers(): void;
    mount(): Cleanup;
}

export const useIsomorphicLayoutEffect =
    typeof window === 'undefined' ? useEffect : useLayoutEffect;

function increment(count: number): number {
    return count + 1;
}

function createSetupInstance<T>(
    rerender: () => void,
    setup: (scope: SetupScope) => T,
): SetupInstance<T> {
    const watchers: WatchEntry[] = [];
    const mounted: (() => void)[] = [];
    const unmounted: (() => void)[] = [];
    const ticks: (() => void)[] = [];

    const scope: SetupScope = {
        ref<V>(initial: V): Ref<V> {
            let current = initial;
            return {
                get value(): V {
                    return current;
                },
                set value(next: V) {
                    if (Object.is(next, current)) return;
                    current = next;
                    rerender();
                },
            };
        },
        reactive<V extends object>(initial: V): V {
            return new Proxy(initial, {
                set(target, key, next: unknown) {
                    const previous: unknown = Reflect.get(target, key);
                    Reflect.set(target, key, next);
                    if (!Object.is(previous, next)) rerender();
                    return true;
                },
            });
        },
        watch<V>(
            source: () => V,
            callback: (value: V, previous: V) => void,
            options: WatchOptions = {},
        ): void {
            watchers.push({
                source,
                callback: callback as (value: unknown, previous: unknown) => void,
                previous: source(),
                pendingImmediate: Boolean(options.immediate),
            });
        },
        onMounted(callback: () => void): void {
            mounted.push(callback);
        },
        onBeforeUnmount(callback: () => void): void {
            unmounted.push(callback);
        },
        nextTick(): Promise<void> {
            return new Promise<void>((resolve) => {
                ticks.push(resolve);
                rerender();
            });
        },
    };

    return {
        result: setup(scope),
        flushTicks(): void {
            if (!ticks.length) return;
            for (const resolve of ticks.splice(0)) resolve();
        },
        runWatchers(): void {
            for (const watcher of watchers) {
                const value = watcher.source();
                if (watcher.pendingImmediate) {
                    watcher.pendingImmediate = false;
                    watcher.previous = value;
                    watcher.callback(value, undefined);
                    continue;
                }
                if (Object.is(value, watcher.previous)) continue;
                const previous = watcher.previous;
                watcher.previous = value;
                watcher.callback(value, previous);
            }
        },
        mount(): Cleanup {
            for (const callback of mounted) callback();
            return () => {
                for (const callback of unmounted) callback();
            };
        },
    };
}

/**
 * Runs `setup` once per component instance and keeps its closures alive for the
 * component lifetime, mirroring a composition-style setup function.
 */
export function useSetup<T>(setup: (scope: SetupScope) => T): T {
    const [, rerender] = useReducer(increment, 0);
    const [instance] = useState(() => createSetupInstance(rerender, setup));

    useIsomorphicLayoutEffect(() => instance.flushTicks());
    useEffect(() => instance.runWatchers());
    useEffect(() => instance.mount(), [instance]);

    return instance.result;
}

/**
 * Exposes the latest render value through a stable readonly ref.
 */
export function useLatest<T>(value: T): ReadonlyRef<T> {
    const holder = useRef({ value });
    holder.current.value = value;
    return holder.current;
}

/**
 * Creates a readonly ref whose value is derived on every read.
 */
export function computed<T>(getter: () => T): ReadonlyRef<T> {
    return {
        get value(): T {
            return getter();
        },
    };
}
