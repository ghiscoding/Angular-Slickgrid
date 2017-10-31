import { Column } from './../models/index';
export declare const Formatters: {
    checkbox: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    checkmark: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    dateIso: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    dateTimeIso: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    dateTimeIsoAmPm: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    dateUs: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    dateTimeUs: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    dateTimeUsAmPm: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    deleteIcon: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    editIcon: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    percentComplete: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    percentCompleteBar: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    progressBar: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
    yesNo: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
};
