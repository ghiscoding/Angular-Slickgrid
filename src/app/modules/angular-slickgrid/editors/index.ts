import { EditorType } from './../models/editorType.enum';
import { CheckboxEditor } from './checkboxEditor';
import { DateEditor } from './dateEditor';
import { FloatEditor } from './floatEditor';
import { IntegerEditor } from './integerEditor';
import { LongTextEditor } from './longTextEditor';
import { MultipleSelectEditor } from './multipleSelectEditor';
import { SingleSelectEditor } from './singleSelectEditor';
import { TextEditor } from './textEditor';
import { Editor } from '../models';

export class AvailableEditor {
  constructor(public type: EditorType, public editor: any) {}
}

export const Editors = {
  checkbox: CheckboxEditor,
  date: DateEditor,
  float: FloatEditor,
  integer: IntegerEditor,
  longText: LongTextEditor,
  multipleSelect: MultipleSelectEditor,
  singleSelect: SingleSelectEditor,
  text: TextEditor
};

export const AVAILABLE_EDITORS: AvailableEditor[] = [
  { type: EditorType.checkbox, editor: CheckboxEditor },
  { type: EditorType.date, editor: DateEditor },
  { type: EditorType.float, editor: FloatEditor },
  { type: EditorType.integer, editor: IntegerEditor },
  { type: EditorType.longText, editor: LongTextEditor },
  { type: EditorType.multipleSelect, editor: MultipleSelectEditor },
  { type: EditorType.singleSelect, editor: SingleSelectEditor },
  { type: EditorType.text, editor: TextEditor },
];
