import { InputFilter } from './inputFilter';

export class InputNumberFilter extends InputFilter {
  /** Initialize the Filter */
  constructor() {
    super();
    this.inputType = 'number';
  }
}
