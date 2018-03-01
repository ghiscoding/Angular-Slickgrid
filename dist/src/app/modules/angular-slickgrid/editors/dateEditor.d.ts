import { Column, Editor, GridOption } from './../models/index';
export declare class DateEditor implements Editor {
    private args;
    $input: any;
    flatInstance: any;
    defaultDate: string;
    constructor(args: any);
    init(): void;
    getCurrentLocale(columnDef: Column, gridOptions: GridOption): any;
    loadFlatpickrLocale(locale: string): any;
    destroy(): void;
    show(): void;
    hide(): void;
    focus(): void;
    save(): void;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): any;
}
