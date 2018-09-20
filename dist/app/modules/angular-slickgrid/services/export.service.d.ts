import { TranslateService } from '@ngx-translate/core';
import { Column, ExportOption, FileType } from './../models/index';
import { Subject } from 'rxjs/Subject';
export interface ExportColumnHeader {
    key: string;
    title: string;
}
export declare class ExportService {
    private translate;
    private _lineCarriageReturn;
    private _dataView;
    private _grid;
    private _exportQuoteWrapper;
    private _columnHeaders;
    private _groupedHeaders;
    private _hasGroupedItems;
    private _exportOptions;
    onGridBeforeExportToFile: Subject<boolean>;
    onGridAfterExportToFile: Subject<{
        options: any;
    }>;
    constructor(translate: TranslateService);
    private readonly datasetIdName;
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /**
     * Initialize the Export Service
     * @param grid
     * @param gridOptions
     * @param dataView
     */
    init(grid: any, dataView: any): void;
    /**
     * Function to export the Grid result to an Excel CSV format using javascript for it to produce the CSV file.
     * This is a WYSIWYG export to file output (What You See is What You Get)
     *
     * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
     * which means that if any column(s) got moved in the UI, it has to be reflected in the JSON array output as well
     *
     * Example: exportToFile({ format: FileType.csv, delimiter: DelimiterType.comma })
     */
    exportToFile(options: ExportOption): void;
    getDataOutput(): string;
    /**
     * Get all the grid row data and return that as an output string
     */
    getAllGridRowData(columns: Column[], lineCarriageReturn: string): string;
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param columns of the grid
     */
    getColumnHeaders(columns: Column[]): ExportColumnHeader[];
    /**
     * Get the data of a regular row (a row without grouping)
     * @param row
     * @param itemObj
     */
    readRegularRowData(columns: Column[], row: number, itemObj: any): string;
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param itemObj
     */
    readGroupedTitleRow(itemObj: any): string;
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param itemObj
     */
    readGroupedTotalRow(columns: Column[], itemObj: any): string;
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param options
     */
    startDownloadFile(options: {
        filename: string;
        csvContent: any;
        format: FileType | string;
        useUtf8WithBom: boolean;
    }): void;
}
