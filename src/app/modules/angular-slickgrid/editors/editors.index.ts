import { AutoCompleteEditor } from './autoCompleteEditor';
import { CheckboxEditor } from './checkboxEditor';
import { DateEditor } from './dateEditor';
import { DualInputEditor } from './dualInputEditor';
import { FloatEditor } from './floatEditor';
import { IntegerEditor } from './integerEditor';
import { LongTextEditor } from './longTextEditor';
import { MultipleSelectEditor } from './multipleSelectEditor';
import { SingleSelectEditor } from './singleSelectEditor';
import { SliderEditor } from './sliderEditor';
import { TextEditor } from './textEditor';

export const Editors = {
  /** AutoComplete Editor (using jQuery UI autocomplete feature) */
  autoComplete: AutoCompleteEditor,

  /** Checkbox Editor (uses native checkbox DOM element) */
  checkbox: CheckboxEditor,

  /** Date Picker Editor (which uses 3rd party lib "flatpickr") */
  date: DateEditor,

  /** Dual Input Editor, default input type is text but it could be (integer/float/number/password/text) */
  dualInput: DualInputEditor,

  /** Float Number Editor */
  float: FloatEditor,

  /** Integer Editor */
  integer: IntegerEditor,

  /** Long Text Editor (uses a textarea) */
  longText: LongTextEditor,

  /** Multiple Select editor (which uses 3rd party lib "multiple-select.js") */
  multipleSelect: MultipleSelectEditor,

  /** Single Select editor (which uses 3rd party lib "multiple-select.js") */
  singleSelect: SingleSelectEditor,

  /** Slider Editor */
  slider: SliderEditor,

  /** Text Editor */
  text: TextEditor
};
