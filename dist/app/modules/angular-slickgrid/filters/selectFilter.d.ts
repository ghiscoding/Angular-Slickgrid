import { TranslateService } from '@ngx-translate/core';
import { CollectionCustomStructure, CollectionOption, Column, ColumnFilter, Filter, FilterArguments, FilterCallback, GridOption, MultipleSelectOption, OperatorType, OperatorString, SearchTerm } from './../models/index';
import { CollectionService } from './../services/collection.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
export declare class SelectFilter implements Filter {
    protected translate: TranslateService;
    protected collectionService: CollectionService;
    protected isMultipleSelect: boolean;
    /** DOM Element Name, useful for auto-detecting positioning (dropup / dropdown) */
    elementName: string;
    /** Filter Multiple-Select options */
    filterElmOptions: MultipleSelectOption;
    /** The JQuery DOM element */
    $filterElm: any;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    defaultOptions: MultipleSelectOption;
    isFilled: boolean;
    labelName: string;
    labelPrefixName: string;
    labelSuffixName: string;
    valueName: string;
    enableTranslateLabel: boolean;
    subscriptions: Subscription[];
    /**
     * Initialize the Filter
     */
    constructor(translate: TranslateService, collectionService: CollectionService, isMultipleSelect?: boolean);
    /** Getter for the Column Filter itself */
    protected readonly columnFilter: ColumnFilter;
    /** Getter for the Collection Options */
    protected readonly collectionOptions: CollectionOption;
    /** Getter for the Custom Structure if exist */
    protected readonly customStructure: CollectionCustomStructure;
    /** Getter for the Grid Options pulled through the Grid Object */
    protected readonly gridOptions: GridOption;
    /** Getter for the filter operator */
    readonly operator: OperatorType | OperatorString;
    /**
     * Initialize the filter template
     */
    init(args: FilterArguments): void;
    /**
     * Clear the filter values
     */
    clear(): void;
    /**
     * destroy the filter
     */
    destroy(): void;
    /**
     * Set value(s) on the DOM element
     */
    setValues(values: SearchTerm | SearchTerm[]): void;
    /**
     * Automatically adjust the multiple-select dropup or dropdown by available space
     */
    protected autoAdjustDropPosition(multipleSelectOptions: MultipleSelectOption): void;
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    protected filterCollection(inputCollection: any): any;
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    protected sortCollection(inputCollection: any): any;
    protected renderOptionsAsync(collectionAsync: Promise<any> | Observable<any> | Subject<any>): Promise<void>;
    /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
    protected createCollectionAsyncSubject(): void;
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     */
    protected renderDomElementFromCollectionAsync(collection: any): void;
    protected renderDomElement(collection: any): void;
    /**
     * Create the HTML template as a string
     */
    protected buildTemplateHtmlString(optionCollection: any[], searchTerms: SearchTerm[]): string;
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    protected createBlankEntry(): {
        [x: string]: string;
    };
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param filterTemplate
     */
    protected createDomElement(filterTemplate: string): void;
}
