import { InputFilter } from './inputFilter';

export class InputPasswordFilter extends InputFilter {
  /** Initialize the Filter */
  constructor() {
    super();
    this.inputType = 'password';
  }
}
