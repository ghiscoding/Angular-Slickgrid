import { EditorType } from './editorType.enum';
import { TextEditor } from './../editors/textEditor';
import { SingleSelectEditor } from './../editors/singleSelectEditor';
import { MultipleSelectEditor } from './../editors/multipleSelectEditor';
import { LongTextEditor } from './../editors/longTextEditor';
import { IntegerEditor } from './../editors/integerEditor';
import { FloatEditor } from './../editors/floatEditor';
import { DateEditor } from './../editors/dateEditor';
import { CheckboxEditor } from './../editors/checkboxEditor';
import {
  CollectionFilterBy,
  CollectionSortBy,
  Editor,
  MultipleSelectOption
} from './../models/index';

export interface ColumnEditor {
  /** Custom Editor */
  customEditor?: any;

  /** Editor Type to use (input, multipleSelect, singleSelect, select, custom) */
  type?: EditorType;

  collection?: any[];

  /** We could filter some items from the collection */
  collectionFilterBy?: CollectionFilterBy;

  /** We could sort the collection by their value, or by translated value when enableTranslateLabel is True */
  collectionSortBy?: CollectionSortBy;

  /** Options that could be provided to the Editor, example: { container: 'body', maxHeight: 250} */
  editorOptions?: MultipleSelectOption | any;

  /** Do we want the Editor to handle translation (localization)? */
  enableTranslateLabel?: boolean;

  /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Editor */
  customStructure?: {
    label: string;
    value: string;
  };

  /**
   * Use "params" to pass any type of arguments to your Custom Editor (type: EditorType.custom)
   * or regular Editor like the EditorType.float
   * for example, to pass the option collection to a select Filter we can type this:
   * params: { decimalPlaces: 2 }
   */
  params?: any;
}
