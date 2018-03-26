import { Editor, HtmlElementPosition } from './../models/index';
export declare class LongTextEditor implements Editor {
    private args;
    $input: any;
    $wrapper: any;
    defaultValue: any;
    constructor(args: any);
    init(): void;
    handleKeyDown(e: any): void;
    save(): void;
    cancel(): void;
    hide(): void;
    show(): void;
    position(position: HtmlElementPosition): void;
    destroy(): void;
    focus(): void;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(): {
        valid: boolean;
        msg: any;
    };
}
