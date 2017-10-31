import { Editor } from './../models';
export declare class IntegerEditor implements Editor {
    private args;
    $input: any;
    defaultValue: any;
    constructor(args: any);
    init(): void;
    destroy(): void;
    focus(): void;
    loadValue(item: any): void;
    serializeValue(): number;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): any;
}
