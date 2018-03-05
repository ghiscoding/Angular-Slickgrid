import { Column, Filter, FilterArguments, FilterCallback, SearchTerm } from './../models/index';
export declare class InputFilter implements Filter {
    private $filterElm;
    grid: any;
    searchTerm: SearchTerm;
    columnDef: Column;
    callback: FilterCallback;
    constructor();
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
    setValues(values: SearchTerm): void;
    /**
     * Create the HTML template as a string
     */
    private buildTemplateHtmlString();
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    private createDomElement(filterTemplate);
}
