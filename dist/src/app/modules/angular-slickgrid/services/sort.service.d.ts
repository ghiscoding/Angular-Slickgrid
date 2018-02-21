import { EventEmitter } from '@angular/core';
import { GridOption } from './../models';
export declare class SortService {
    subscriber: any;
    onSortChanged: EventEmitter<string>;
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     */
    attachBackendOnSort(grid: any, gridOptions: GridOption): void;
    attachBackendOnSortSubscribe(event: any, args: any): Promise<void>;
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    attachLocalOnSort(grid: any, gridOptions: GridOption, dataView: any): void;
    destroy(): void;
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param sender
     */
    emitSortChangedBy(sender: string): void;
}
