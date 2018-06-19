import { EditorValidatorOutput } from './editorValidatorOutput.interface';
export interface Editor {
    init: () => void;
    save?: () => void;
    cancel?: () => void;
    hide?: () => void;
    show?: () => void;
    position?: (position: any) => void;
    destroy: () => void;
    focus: () => void;
    applyValue: (item: any, state: any) => void;
    loadValue: (item: any) => void;
    serializeValue: () => any;
    isValueChanged: () => boolean;
    validate: () => EditorValidatorOutput;
}
