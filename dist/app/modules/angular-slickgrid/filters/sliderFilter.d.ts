import { Column, Filter, FilterArguments, FilterCallback, OperatorType, OperatorString, SearchTerm } from './../models/index';
export declare class SliderFilter implements Filter {
    private $filterElm;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    /** Getter for the Filter Generic Params */
    private readonly filterParams;
    /** Getter for the `filter` properties */
    private readonly filterProperties;
    readonly operator: OperatorType | OperatorString;
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
