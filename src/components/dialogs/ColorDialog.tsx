import { ColorPalette } from '../toolbar/ColorPalette';
import { BaseDialog } from './BaseDialog';

interface ColorDialogProps {
    mode: 'forecolor' | 'backcolor';
    colors: string[];
    onClose: () => void;
    onSelect: (color: string) => void;
}

export function ColorDialog({ mode, colors, onClose, onSelect }: ColorDialogProps) {
    const label = mode === 'forecolor' ? 'Text color' : 'Background color';
    return (
        <BaseDialog
            title={label}
            onClose={onClose}
        >
            <ColorPalette
                colors={colors}
                current=""
                label={label}
                onSelect={onSelect}
            />
        </BaseDialog>
    );
}
