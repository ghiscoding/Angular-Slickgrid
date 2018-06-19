import { Column, Editor, EditorValidator, EditorValidatorOutput, GridOption, HtmlElementPosition } from './../models/index';
export declare class LongTextEditor implements Editor {
    private args;
    $input: any;
    $wrapper: any;
    defaultValue: any;
    /** Grid options */
    gridOptions: GridOption;
    /** The i18n aurelia library */
    private _translate;
    constructor(args: any);
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: any;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    init(): void;
    handleKeyDown(e: any): void;
    save(): void;
    cancel(): void;
    hide(): void;
    show(): void;
    position(position: HtmlElementPosition): void;
    destroy(): void;
    focus(): void;
    getColumnEditor(): any;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): EditorValidatorOutput;
}
