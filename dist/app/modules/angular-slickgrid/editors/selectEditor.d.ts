import { TranslateService } from '@ngx-translate/core';
import { CollectionCustomStructure, CollectionOption, Column, Editor, EditorValidator, EditorValidatorOutput, GridOption, MultipleSelectOption } from './../models/index';
import { CollectionService } from '../services/index';
import { Subscription } from 'rxjs/Subscription';
/**
 * Slickgrid editor class for multiple/single select lists
 */
export declare class SelectEditor implements Editor {
    protected args: any;
    protected isMultipleSelect: any;
    /** The JQuery DOM element */
    $editorElm: any;
    /** Editor Multiple-Select options */
    editorElmOptions: MultipleSelectOption;
    /** The multiple-select options for a multiple select list */
    defaultOptions: MultipleSelectOption;
    /** The default item values that are set */
    defaultValue: any[];
    /** The property name for values in the collection */
    valueName: string;
    /** The property name for labels in the collection */
    labelName: string;
    /** The property name for a prefix that can be added to the labels in the collection */
    labelPrefixName: string;
    /** The property name for a suffix that can be added to the labels in the collection */
    labelSuffixName: string;
    /** Grid options */
    gridOptions: GridOption;
    /** Do we translate the label? */
    enableTranslateLabel: boolean;
    /** Observable Subscriptions */
    _subscriptions: Subscription[];
    /** Collection Service */
    protected _collectionService: CollectionService;
    /** The i18n aurelia library */
    protected _translate: TranslateService;
    constructor(args: any, isMultipleSelect: any);
    /** Get the Collection */
    readonly collection: any[];
    /** Getter for the Collection Options */
    readonly collectionOptions: CollectionOption;
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: any;
    /** Getter for the Custom Structure if exist */
    protected readonly customStructure: CollectionCustomStructure;
    /**
     * The current selected values (multiple select) from the collection
     */
    readonly currentValues: any[];
    /**
     * The current selected values (single select) from the collection
     */
    readonly currentValue: any;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    init(): void;
    applyValue(item: any, state: any): void;
    destroy(): void;
    loadValue(item: any): void;
    loadSingleValue(item: any): void;
    serializeValue(): any;
    focus(): void;
    isValueChanged(): boolean;
    validate(): EditorValidatorOutput;
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    protected filterCollection(inputCollection: any): any;
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection sorted collection
     */
    protected sortCollection(inputCollection: any): any;
    protected renderDomElement(collection: any[]): void;
    protected buildTemplateHtmlString(collection: any[]): string;
    /**
     * Automatically adjust the multiple-select dropup or dropdown by available space
     */
    protected autoAdjustDropPosition(multipleSelectDomElement: any, multipleSelectOptions: MultipleSelectOption): void;
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    protected createBlankEntry(): {
        [x: string]: string;
    };
    /** Build the template HTML string */
    protected createDomElement(editorTemplate: string): void;
    protected refresh(): void;
}
