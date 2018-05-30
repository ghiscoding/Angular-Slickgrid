import { Editor, KeyCode } from './../models/index';

// using external non-typed js libraries
declare var $: any;

const defaultDecimalPlaces = 2;

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
    const columnEditor = this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    let rtn = (columnEditor && columnEditor.params && columnEditor.params.hasOwnProperty('decimalPlaces')) ? columnEditor.params.decimalPlaces : undefined;
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
    const elmValue = this.$input.val();
    return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
  }

  validate() {
    const elmValue = this.$input.val();
    if (isNaN(elmValue as number)) {
      return {
        valid: false,
        msg: 'Please enter a valid number'
      };
    }

    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(elmValue);
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
