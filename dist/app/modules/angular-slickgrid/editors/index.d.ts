import { CheckboxEditor } from './checkboxEditor';
import { DateEditor } from './dateEditor';
import { FloatEditor } from './floatEditor';
import { IntegerEditor } from './integerEditor';
import { LongTextEditor } from './longTextEditor';
import { MultipleSelectEditor } from './multipleSelectEditor';
import { SingleSelectEditor } from './singleSelectEditor';
import { SliderEditor } from './sliderEditor';
import { TextEditor } from './textEditor';
export declare const Editors: {
    /** Checkbox Editor (uses native checkbox DOM element) */
    checkbox: typeof CheckboxEditor;
    /** Date Picker Editor (which uses 3rd party lib "flatpickr") */
    date: typeof DateEditor;
    /** Float Number Editor */
    float: typeof FloatEditor;
    /** Integer Editor */
    integer: typeof IntegerEditor;
    /** Long Text Editor (uses a textarea) */
    longText: typeof LongTextEditor;
    /** Multiple Select editor (which uses 3rd party lib "multiple-select.js") */
    multipleSelect: typeof MultipleSelectEditor;
    /** Single Select editor (which uses 3rd party lib "multiple-select.js") */
    singleSelect: typeof SingleSelectEditor;
    /** Slider Editor */
    slider: typeof SliderEditor;
    /** Text Editor */
    text: typeof TextEditor;
};
