import { TranslateService } from '@ngx-translate/core';
import { Column, Filter, FilterArguments, FilterCallback, OperatorType, OperatorString, SearchTerm } from './../models/index';
export declare class NativeSelectFilter implements Filter {
    private translate;
    private _clearFilterTriggered;
    $filterElm: any;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    constructor(translate: TranslateService);
    readonly operator: OperatorType | OperatorString;
    /**
     * Initialize the Filter
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
    private buildTemplateHtmlString;
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    private createDomElement;
}
