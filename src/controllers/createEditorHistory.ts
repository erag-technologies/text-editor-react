import type { SetupScope } from '../hooks/useSetup';
import { canUseHistory } from '../commands/historyCommands';
import type { ReadonlyRef } from '../types';

export function createEditorHistory(scope: SetupScope, root: ReadonlyRef<HTMLElement | null>) {
    const canUndo = scope.ref(false);
    const canRedo = scope.ref(false);
    let frame = 0;

    function update(): void {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            if (!root.value) {
                canUndo.value = false;
                canRedo.value = false;
                return;
            }

            canUndo.value = canUseHistory('undo');
            canRedo.value = canUseHistory('redo');
        });
    }

    function reset(): void {
        cancelAnimationFrame(frame);
        canUndo.value = false;
        canRedo.value = false;
    }

    scope.onBeforeUnmount(() => cancelAnimationFrame(frame));

    return { canUndo, canRedo, update, reset };
}
