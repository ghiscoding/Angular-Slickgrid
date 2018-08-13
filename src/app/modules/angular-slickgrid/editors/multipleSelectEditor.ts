import { SelectEditor } from './selectEditor';

export class MultipleSelectEditor extends SelectEditor {
  /**
   * Initialize the Editor
   */
  constructor(protected args: any) {
    super(args, true);
  }
}
