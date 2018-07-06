import { Column, Filter, FilterArguments, FilterCallback, OperatorString, OperatorType, SearchTerm } from './../models/index';
export declare class CompoundSliderFilter implements Filter {
    private _elementRangeInputId;
    private _elementRangeOutputId;
    private _operator;
    private $containerInputGroupElm;
    private $filterElm;
    private $filterInputElm;
    private $selectOperatorElm;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    constructor();
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly gridOptions;
    /** Getter for the Filter Generic Params */
    private readonly filterParams;
    /** Getter for the `filter` properties */
    private readonly filterProperties;
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
    /** Build HTML Template for the input range (slider) */
    private buildTemplateHtmlString();
    /** Build HTML Template for the text (number) that is shown appended to the slider */
    private buildTemplateSliderTextHtmlString();
    /** Build HTML Template select dropdown (operator) */
    private buildSelectOperatorHtmlString();
    /** Get the available operator option values */
    private getOptionValues();
    /**
     * Create the DOM element
     */
    private createDomElement(searchTerm?);
    private onTriggerEvent(e, clearFilterTriggered?);
}
