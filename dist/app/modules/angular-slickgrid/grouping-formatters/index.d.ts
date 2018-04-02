import { Column } from './../models/index';
/** Provides a list of different Formatters that will change the cell value displayed in the UI */
export declare const GroupTotalFormatters: {
    avgTotals: (totals: any, columnDef: Column, grid?: any) => string;
    avgTotalsDollar: (totals: any, columnDef: Column, grid?: any) => string;
    avgTotalsPercentage: (totals: any, columnDef: Column, grid?: any) => string;
    maxTotals: (totals: any, columnDef: Column, grid?: any) => string;
    minTotals: (totals: any, columnDef: Column, grid?: any) => string;
    sumTotals: (totals: any, columnDef: Column, grid?: any) => string;
    sumTotalsBold: (totals: any, columnDef: Column, grid?: any) => string;
    sumTotalsColored: (totals: any, columnDef: Column, grid?: any) => string;
    sumTotalsDollar: (totals: any, columnDef: Column, grid?: any) => string;
    sumTotalsDollarBold: (totals: any, columnDef: Column, grid?: any) => string;
    sumTotalsDollarColored: (totals: any, columnDef: Column, grid?: any) => string;
    sumTotalsDollarColoredBold: (totals: any, columnDef: Column, grid?: any) => string;
};
