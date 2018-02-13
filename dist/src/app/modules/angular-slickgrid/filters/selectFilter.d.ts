import { FilterArguments } from './../models/filterArguments.interface';
import { FilterCallback } from './../models/filterCallback.interface';
import { Column, Filter } from './../models';
import { TranslateService } from '@ngx-translate/core';
export declare class SelectFilter implements Filter {
    private translate;
    $filterElm: any;
    grid: any;
    searchTerm: string | number | boolean;
    columnDef: Column;
    callback: FilterCallback;
    constructor(translate: TranslateService);
    /**
     * Initialize the Filter
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
    private buildTemplateHtmlString();
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    private createDomElement(filterTemplate);
}
