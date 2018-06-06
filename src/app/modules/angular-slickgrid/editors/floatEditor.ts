import { Column, Editor, KeyCode } from './../models/index';

// using external non-typed js libraries
declare var $: any;

const defaultDecimalPlaces = 0;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class FloatEditor implements Editor {
  $input: any;
  defaultValue: any;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    this.$input = $(`<input type="number" class="editor-text" step="${this.getInputDecimalSteps()}" />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (e) => {
        if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

    setTimeout(() => {
      this.$input.focus().select();
    }, 50);
  }

  destroy() {
    this.$input.remove();
  }

  focus() {
    this.$input.focus();
  }

  getColumnEditor() {
    return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
  }

  getDecimalPlaces() {
    // returns the number of fixed decimal places or null
    const columnEditor = this.getColumnEditor();
    let rtn = (columnEditor && columnEditor.params && columnEditor.params.hasOwnProperty('decimalPlaces')) ? columnEditor.params.decimalPlaces : undefined;
    if (rtn === undefined) {
      rtn = defaultDecimalPlaces;
    }
    return (!rtn && rtn !== 0 ? null : rtn);
  }

  getInputDecimalSteps() {
    const decimals = this.getDecimalPlaces();
    let zeroString = '';
    for (let i = 1; i < decimals; i++) {
      zeroString += '0';
    }

    if (decimals > 0) {
      return `0.${zeroString}1`;
    }
    return '1';
  }

  loadValue(item: any) {
    this.defaultValue = item[this.args.column.field];

    const decPlaces = this.getDecimalPlaces();
    if (decPlaces !== null
      && (this.defaultValue || this.defaultValue === 0)
      && this.defaultValue.toFixed) {
      this.defaultValue = this.defaultValue.toFixed(decPlaces);
    }

    this.$input.val(this.defaultValue);
    this.$input[0].defaultValue = this.defaultValue;
    this.$input.select();
  }

  serializeValue() {
    let rtn = parseFloat(this.$input.val()) || 0;
    const decPlaces = this.getDecimalPlaces();
    if (decPlaces !== null
      && (rtn || rtn === 0)
      && rtn.toFixed) {
      rtn = parseFloat(rtn.toFixed(decPlaces));
    }

    return rtn;
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    const elmValue = this.$input.val();
    return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
  }

  validate() {
    const column = (this.args && this.args.column) as Column;
    const elmValue = this.$input.val();
    const columnEditor = this.getColumnEditor();
    const decPlaces = this.getDecimalPlaces();
    const errorMsg = columnEditor.params && columnEditor.params.validatorErrorMessage;

    if (column.validator) {
      const validationResults = column.validator(elmValue);
      if (!validationResults.valid) {
        return validationResults;
      }
    } else if (isNaN(elmValue as number) || (decPlaces === 0 && !/^(\d+(\.)?(\d)*)$/.test(elmValue))) {
      // when decimal value is 0 (which is the default), we accept 0 or more decimal values
      return {
        valid: false,
        msg: errorMsg || `Please enter a valid number`
      };
    } else if (isNaN(elmValue as number) || (decPlaces > 0 && !new RegExp(`^(\\d+(\\.)?(\\d){0,${decPlaces}})$`).test(elmValue))) {
      // when decimal value is bigger than 0, we only accept the decimal values as that value set
      // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
      return {
        valid: false,
        msg: errorMsg || `Please enter a valid number between 0 and ${decPlaces} decimals`
      };
    }

    return {
      valid: true,
      msg: null
    };
  }
}
