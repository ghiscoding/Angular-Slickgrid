import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from './../services/collection.service';
import { Column, Filter, FilterArguments, FilterCallback, GridOption, MultipleSelectOption, SearchTerm } from './../models/index';
export declare class MultipleSelectFilter implements Filter {
    private collectionService;
    private translate;
    $filterElm: any;
    grid: any;
    gridOptions: GridOption;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    defaultOptions: MultipleSelectOption;
    isFilled: boolean;
    labelName: string;
    valueName: string;
    enableTranslateLabel: boolean;
    /**
     * Initialize the Filter
     */
    constructor(collectionService: CollectionService, translate: TranslateService);
    /**
     * Initialize the filter template
     */
    init(args: FilterArguments): void;
    /**
     * Clear the filter values
     */
    clear(triggerFilterChange?: boolean): void;
    /**
     * destroy the filter
     */
    destroy(): void;
    /**
     * Set value(s) on the DOM element
     */
    setValues(values: SearchTerm[]): void;
    /**
     * Create the HTML template as a string
     */
    private buildTemplateHtmlString(optionCollection);
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param filterTemplate
     */
    private createDomElement(filterTemplate);
    private findValueInSearchTerms(value);
}
