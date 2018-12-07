import { Column, Filter, FilterArguments, FilterCallback, OperatorType, OperatorString, SearchTerm } from './../models/index';
export declare class InputFilter implements Filter {
    private _clearFilterTriggered;
    private _inputType;
    private $filterElm;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    constructor();
    /** Getter of input type (text, number, password) */
    /** Setter of input type (text, number, password) */
    inputType: string;
    /** Getter of the Operator to use when doing the filter comparing */
    readonly operator: OperatorType | OperatorString;
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly gridOptions;
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
    setValues(values: SearchTerm): void;
    /**
     * Create the HTML template as a string
     */
    private buildTemplateHtmlString();
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    private createDomElement(filterTemplate, searchTerm?);
}
