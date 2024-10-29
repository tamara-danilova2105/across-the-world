export type Mods = Record<string, boolean | string | undefined>;
export type Additional = Array<string | undefined>

export function getStyles(
    styles: string,
    mods: Mods = {},
    additional: Additional = [],
): string {
    const modStyles = Object.entries(mods)
    .filter(([_, value]) => Boolean(value))
    .map(([key]) => key)

    return [styles, ...modStyles, ...additional].join(' ');
}