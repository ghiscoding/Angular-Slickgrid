import { TranslateService } from '@ngx-translate/core';
import { Column, Filter, FilterArguments, FilterCallback, OperatorString, OperatorType, SearchTerm } from './../models/index';
export declare class CompoundDateFilter implements Filter {
    private translate;
    private $filterElm;
    private $filterInputElm;
    private $selectOperatorElm;
    private _currentValue;
    flatInstance: any;
    grid: any;
    operator: OperatorType | OperatorString;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    constructor(translate: TranslateService);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly gridOptions;
    /**
     * Initialize the Filter
     */
    init(args: FilterArguments): void;
    /**
     * Clear the filter value
     */
    clear(triggerFilterKeyup?: boolean): void;
    /**
     * destroy the filter
     */
    destroy(): void;
    /**
     * Set value(s) on the DOM element
     */
    setValues(values: SearchTerm[]): void;
    private buildDatePickerInput(searchTerm?);
    private buildSelectOperatorHtmlString();
    private getOptionValues();
    /**
     * Create the DOM element
     */
    private createDomElement(searchTerm?);
    private getCurrentLocale(columnDef, gridOptions);
    private loadFlatpickrLocale(locale);
    private onTriggerEvent(e);
    private hide();
    private show();
}
