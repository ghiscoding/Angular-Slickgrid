import { Editor } from './../models/index';
export declare class FloatEditor implements Editor {
    private args;
    $input: any;
    defaultValue: any;
    constructor(args: any);
    init(): void;
    destroy(): void;
    focus(): void;
    getColumnEditor(): any;
    getDecimalPlaces(): any;
    getInputDecimalSteps(): string;
    loadValue(item: any): void;
    serializeValue(): number;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): any;
}
