import { Editor, Column, MultipleSelectOption, SelectOption } from './../models/index';
/**
 * Slickgrid editor class for multiple select lists
 */
export declare class MultipleSelectEditor implements Editor {
    private args;
    /** The JQuery DOM element */
    $editorElm: any;
    /** The slick grid column being edited */
    columnDef: Column;
    /** The multiple-select options for a multiple select list */
    defaultOptions: MultipleSelectOption;
    /** The default item values that are set */
    defaultValue: any[];
    /** The options label/value object to use in the select list */
    collection: SelectOption[];
    /** The property name for values in the collection */
    valueName: string;
    /** The property name for labels in the collection */
    labelName: string;
    /** The i18n aurelia library */
    private _translate;
    constructor(args: any);
    /**
     * The current selected values from the collection
     */
    readonly currentValues: (string | number)[];
    init(): void;
    applyValue(item: any, state: any): void;
    destroy(): void;
    loadValue(item: any): void;
    serializeValue(): any;
    focus(): void;
    isValueChanged(): boolean;
    validate(): any;
    private buildTemplateHtmlString();
    private createDomElement(editorTemplate);
    private refresh();
}
