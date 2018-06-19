import { Column, Editor, EditorValidator, EditorValidatorOutput, GridOption } from './../models/index';
export declare class DateEditor implements Editor {
    private args;
    $input: any;
    flatInstance: any;
    defaultDate: string;
    constructor(args: any);
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: any;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    init(): void;
    getCurrentLocale(columnDef: Column, gridOptions: GridOption): any;
    loadFlatpickrLocale(locale: string): any;
    destroy(): void;
    show(): void;
    hide(): void;
    focus(): void;
    save(): void;
    getColumnEditor(): any;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): EditorValidatorOutput;
}
