import './global-utilities';
import { OdataService } from './odata.service';
import { BackendService, FilterChangedArgs, OdataOption, PaginationChangedArgs, SortChangedArgs } from './../models/index';
export declare class GridOdataService implements BackendService {
    private odataService;
    serviceOptions: OdataOption;
    defaultSortBy: string;
    minUserInactivityOnFilter: number;
    constructor(odataService: OdataService);
    buildQuery(): string;
    initOptions(options: OdataOption): void;
    updateOptions(options?: OdataOption): void;
    removeColumnFilter(fieldName: string): void;
    resetPaginationOptions(): void;
    saveColumnFilter(fieldName: string, value: string, terms?: any[]): void;
    onFilterChanged(event: Event, args: FilterChangedArgs): Promise<string>;
    onPaginationChanged(event: Event, args: PaginationChangedArgs): string;
    onSortChanged(event: Event, args: SortChangedArgs): string;
    /**
      * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
      * @param string operator
      * @returns string map
      */
    private mapOdataOperator(operator);
}
