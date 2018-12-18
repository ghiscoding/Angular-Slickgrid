import { TranslateService } from '@ngx-translate/core';
import { Column, Filter, FilterArguments, FilterCallback, OperatorString, OperatorType, SearchTerm } from './../models/index';
export declare class CompoundDateFilter implements Filter {
    private translate;
    private _clearFilterTriggered;
    private $filterElm;
    private $filterInputElm;
    private $selectOperatorElm;
    private _currentValue;
    private _operator;
    flatInstance: any;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    constructor(translate: TranslateService);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly gridOptions;
    operator: OperatorType | OperatorString;
    /**
     * Initialize the Filter
     */
    init(args: FilterArguments): void;
    /**
     * Clear the filter value
     */
    clear(): void;
    /**
     * destroy the filter
     */
    destroy(): void;
    /**
     * Set value(s) on the DOM element
     */
    setValues(values: SearchTerm[]): void;
    private buildDatePickerInput;
    private buildSelectOperatorHtmlString;
    private getOptionValues;
    /**
     * Create the DOM element
     */
    private createDomElement;
    private loadFlatpickrLocale;
    private onTriggerEvent;
    private hide;
    private show;
}
