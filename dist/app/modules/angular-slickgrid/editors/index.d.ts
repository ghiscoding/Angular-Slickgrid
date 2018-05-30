import { EditorType } from './../models/editorType.enum';
import { CheckboxEditor } from './checkboxEditor';
import { DateEditor } from './dateEditor';
import { FloatEditor } from './floatEditor';
import { IntegerEditor } from './integerEditor';
import { LongTextEditor } from './longTextEditor';
import { MultipleSelectEditor } from './multipleSelectEditor';
import { SingleSelectEditor } from './singleSelectEditor';
import { TextEditor } from './textEditor';
export declare class AvailableEditor {
    type: EditorType;
    editor: any;
    constructor(type: EditorType, editor: any);
}
export declare const Editors: {
    checkbox: typeof CheckboxEditor;
    date: typeof DateEditor;
    float: typeof FloatEditor;
    integer: typeof IntegerEditor;
    longText: typeof LongTextEditor;
    multipleSelect: typeof MultipleSelectEditor;
    singleSelect: typeof SingleSelectEditor;
    text: typeof TextEditor;
};
export declare const AVAILABLE_EDITORS: AvailableEditor[];
