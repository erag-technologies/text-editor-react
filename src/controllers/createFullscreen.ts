import type { RefObject } from 'react';
import type { SetupScope } from '../hooks/useSetup';

export function createFullscreen(scope: SetupScope, root: RefObject<HTMLElement | null>) {
    const active = scope.ref(false);
    async function toggle(): Promise<void> {
        if (!root.current) return;
        if (document.fullscreenElement) {
            await document.exitFullscreen();
            active.value = false;
            return;
        }
        try {
            await root.current.requestFullscreen();
            active.value = true;
        } catch {
            root.current.classList.toggle('erag-editor--fullscreen');
            active.value = root.current.classList.contains('erag-editor--fullscreen');
        }
    }
    const listener = (): void => {
        active.value =
            Boolean(document.fullscreenElement) ||
            Boolean(root.current?.classList.contains('erag-editor--fullscreen'));
    };
    scope.onMounted(() => document.addEventListener('fullscreenchange', listener));
    scope.onBeforeUnmount(() => document.removeEventListener('fullscreenchange', listener));
    return { active, toggle };
}
