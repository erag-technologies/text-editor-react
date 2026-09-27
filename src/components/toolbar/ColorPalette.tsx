import { useState, type CSSProperties } from 'react';
import { useNativeChange } from '../../hooks/useNativeChange';
import { classNames } from '../../utils/events';

interface ColorPaletteProps {
    colors: string[];
    current: string;
    label: string;
    className?: string;
    style?: CSSProperties;
    onSelect: (color: string) => void;
}

export function ColorPalette({
    colors,
    current,
    label,
    className,
    style,
    onSelect,
}: ColorPaletteProps) {
    const [custom, setCustom] = useState('#000000');
    const customInput = useNativeChange<HTMLInputElement>(onSelect);
    return (
        <div
            className={classNames('erag-color-palette', className)}
            style={style}
            role="grid"
            aria-label={label}
        >
            <button
                type="button"
                className="erag-color-palette__remove"
                onClick={() => onSelect('')}
            >
                Remove color
            </button>
            {colors.map((color) => (
                <button
                    key={color}
                    type="button"
                    className={classNames(
                        'erag-color-palette__swatch',
                        current.toLowerCase() === color.toLowerCase() && 'erag-is-active',
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={color}
                    onClick={() => onSelect(color)}
                />
            ))}
            <label className="erag-color-palette__custom">
                Custom
                <input
                    ref={customInput}
                    type="color"
                    value={custom}
                    onChange={(event) => setCustom(event.target.value)}
                />
            </label>
        </div>
    );
}
