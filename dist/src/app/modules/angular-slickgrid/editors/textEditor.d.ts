import { Editor } from './../models/index';
export declare class TextEditor implements Editor {
    private args;
    $input: any;
    defaultValue: any;
    constructor(args: any);
    init(): void;
    destroy(): void;
    focus(): void;
    getValue(): any;
    setValue(val: string): void;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): any;
}
