/**
 * Serializes plain configuration data so structural changes can be detected
 * across renders. Functions are compared by presence, not identity, so inline
 * handlers do not reset editor state on every render.
 */
export function structuralSignature(value: unknown): string {
    return (
        JSON.stringify(value, (_key, entry: unknown) =>
            typeof entry === 'function' ? '[function]' : entry,
        ) ?? ''
    );
}
