import { Editor, KeyCode } from './../models/index';

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
    this.$input = $(`<input type="number" class='editor-text' />`)
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

  getDecimalPlaces() {
    // returns the number of fixed decimal places or null
    const columnParams = this.args.column.params || {};
    let rtn = (columnParams && columnParams.hasOwnProperty('decimalPlaces')) ? columnParams.decimalPlaces : undefined;
    if (rtn === undefined) {
      rtn = defaultDecimalPlaces;
    }
    return (!rtn && rtn !== 0 ? null : rtn);
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
    return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
  }

  validate() {
    if (isNaN(this.$input.val())) {
      return {
        valid: false,
        msg: 'Please enter a valid number'
      };
    }

    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(this.$input.val());
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  }
}
