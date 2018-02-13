import { FilterArguments } from './../models/filterArguments.interface';
import { FilterCallback } from './../models/filterCallback.interface';
import { Column, Filter } from './../models';
export declare class InputFilter implements Filter {
    private $filterElm;
    grid: any;
    searchTerm: string | number | boolean;
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
     * Create the HTML template as a string
     */
    private buildTemplateHtmlString();
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    private createDomElement(filterTemplate);
}
