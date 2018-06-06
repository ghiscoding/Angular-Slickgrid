import { Editor } from './../models/index';
export declare class CheckboxEditor implements Editor {
    private args;
    $input: any;
    defaultValue: boolean;
    constructor(args: any);
    init(): void;
    destroy(): void;
    focus(): void;
    hide(): void;
    show(): void;
    loadValue(item: any): void;
    preClick(): void;
    serializeValue(): boolean;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): any;
}
