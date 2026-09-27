import type { NativeEditorCommand } from '../types';

type NativeExecCommand = (commandId: string, showUI?: boolean, value?: string) => boolean;

export const executeNativeCommand: NativeEditorCommand = (commandId, value) => {
    if (typeof document === 'undefined') return false;

    const nativeCommand = Reflect.get(document, 'execCommand') as NativeExecCommand | undefined;

    if (!nativeCommand) return false;

    return value === undefined
        ? nativeCommand.call(document, commandId, false)
        : nativeCommand.call(document, commandId, false, value);
};
