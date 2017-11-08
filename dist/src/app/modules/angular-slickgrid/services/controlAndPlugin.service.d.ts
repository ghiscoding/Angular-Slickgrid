import { Router } from '@angular/router';
import { FilterService } from './filter.service';
import { Column, GridOption } from './../models';
export declare class ControlAndPluginService {
    private filterService;
    private router;
    _dataView: any;
    _grid: any;
    _visibleColumns: Column[];
    autoTooltipPlugin: any;
    columnPickerControl: any;
    headerButtonsPlugin: any;
    headerMenuPlugin: any;
    gridMenuControl: any;
    rowSelectionPlugin: any;
    constructor(filterService: FilterService, router: Router);
    attachDifferentControlOrPlugins(grid: any, columnDefinitions: Column[], options: GridOption, dataView: any): void;
    hideColumn(column: Column): void;
    removeColumnByIndex(array: any, index: any): any;
    autoResizeColumns(): void;
    private addGridMenuCustomCommands(options);
    private prepareGridMenu(options);
}
