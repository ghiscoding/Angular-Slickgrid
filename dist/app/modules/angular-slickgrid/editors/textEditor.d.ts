import { Column, Editor, EditorValidator, EditorValidatorOutput } from './../models/index';
export declare class TextEditor implements Editor {
    private args;
    $input: any;
    defaultValue: any;
    constructor(args: any);
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: any;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    init(): void;
    destroy(): void;
    focus(): void;
    getValue(): any;
    setValue(val: string): void;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): EditorValidatorOutput;
}
