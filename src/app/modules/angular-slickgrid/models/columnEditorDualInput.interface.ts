import { ColumnEditor } from './columnEditor.interface';
import { FieldType } from './fieldType.enum';

interface EditorDualInput extends Partial<ColumnEditor> {
  /** Associated Item Field */
  field: string;

  /** Editor Type */
  type: FieldType;
}

export interface ColumnEditorDualInput {
  leftInput: EditorDualInput;
  rightInput: EditorDualInput;
}
