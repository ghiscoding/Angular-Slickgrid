import './global-utilities';
import { FilterChangedArgs, OdataOption, PaginationChangedArgs, SortChangedArgs } from './../models';
import { OdataService } from './odata.service';
export declare class GridOdataService {
    private odataService;
    defaultSortBy: string;
    minUserInactivityOnFilter: number;
    constructor(odataService: OdataService);
    buildQuery(): string;
    initOptions(options: OdataOption): void;
    removeColumnFilter(fieldName: string): void;
    resetPaginationOptions(): void;
    saveColumnFilter(fieldName: string, value: string, terms?: any[]): void;
    onFilterChanged(event: Event, args: FilterChangedArgs): string;
    onPaginationChanged(event: Event, args: PaginationChangedArgs): string;
    onSortChanged(event: Event, args: SortChangedArgs): string;
    /**
      * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
      * @param string operator
      * @returns string map
      */
    private mapOperator(operator);
    /**
     * Parse a date passed as a string and return a Date object (if valid)
     * @param string inputDateString
     * @returns object Date
     */
    private parseUtcDate(inputDateString, useUtc);
}
