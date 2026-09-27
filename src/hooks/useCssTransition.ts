import { useEffect, useRef, useState, type RefObject } from 'react';

type TransitionPhase = 'entering' | 'entered' | 'leaving' | 'left';

export interface CssTransitionState<T extends HTMLElement> {
    mounted: boolean;
    className: string;
    ref: RefObject<T | null>;
}

function seconds(value: string): number {
    const amount = Number.parseFloat(value);
    if (!Number.isFinite(amount)) return 0;
    return value.trim().endsWith('ms') ? amount : amount * 1000;
}

function longestTransition(element: HTMLElement): number {
    const styles = window.getComputedStyle(element);
    const durations = styles.transitionDuration.split(',');
    const delays = styles.transitionDelay.split(',');
    return durations.reduce(
        (longest, duration, index) =>
            Math.max(longest, seconds(duration) + seconds(delays[index] ?? delays[0] ?? '0s')),
        0,
    );
}

/**
 * Applies `-enter-from/-enter-active/-enter-to` and `-leave-from/-leave-active/-leave-to`
 * classes while an element enters or leaves, keeping it mounted until the leave
 * transition has finished.
 */
export function useCssTransition<T extends HTMLElement>(
    show: boolean,
    name: string,
): CssTransitionState<T> {
    const [phase, setPhase] = useState<TransitionPhase>(show ? 'entered' : 'left');
    const [armed, setArmed] = useState(false);
    const element = useRef<T>(null);

    useEffect(() => {
        if (show && (phase === 'left' || phase === 'leaving')) {
            setArmed(false);
            setPhase('entering');
        } else if (!show && (phase === 'entered' || phase === 'entering')) {
            setArmed(false);
            setPhase('leaving');
        }
        // Only react to visibility changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        if (phase !== 'entering' && phase !== 'leaving') return;
        let frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => setArmed(true));
        });
        return () => cancelAnimationFrame(frame);
    }, [phase]);

    useEffect(() => {
        if (!armed || (phase !== 'entering' && phase !== 'leaving')) return;
        const duration = element.current ? longestTransition(element.current) : 0;
        const timer = setTimeout(() => {
            setArmed(false);
            setPhase(phase === 'entering' ? 'entered' : 'left');
        }, duration);
        return () => clearTimeout(timer);
    }, [armed, phase]);

    let className = '';
    if (phase === 'entering')
        className = `${name}-enter-active ${armed ? `${name}-enter-to` : `${name}-enter-from`}`;
    if (phase === 'leaving')
        className = `${name}-leave-active ${armed ? `${name}-leave-to` : `${name}-leave-from`}`;

    return { mounted: phase !== 'left', className, ref: element };
}
