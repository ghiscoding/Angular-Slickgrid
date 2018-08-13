import { SelectEditor } from './selectEditor';

export class SingleSelectEditor extends SelectEditor {
  /**
   * Initialize the Editor
   */
  constructor(protected args: any) {
    super(args, false);
  }
}
