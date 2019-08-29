import { InputFilter } from './inputFilter';
import { FilterArguments } from '../models/filterArguments.interface';

export class InputMaskFilter extends InputFilter {
  private _inputMask: string;

  /** Initialize the Filter */
  constructor() {
    super();
    this.inputType = 'text';
  }

  /** Getter of the input mask, when provided */
  get inputMask(): string {
    return this._inputMask;
  }

  /**
   * Override the Filter init used by SlickGrid
   */
  init(args: FilterArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
    }
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // get input mask from params (can be in columnDef or columnFilter params)
    if (this.columnDef && this.columnDef.params && this.columnDef.params.mask) {
      this._inputMask = this.columnDef.params.mask;
    } else if (this.columnFilter && this.columnFilter.params && this.columnFilter.params.mask) {
      this._inputMask = this.columnFilter.params.mask;
    }

    if (!this._inputMask) {
      throw new Error(`[Angular-Slickgrid] The Filters.inputMask requires the mask to be passed in the filter params or the column definition params
        for example:: this.columnDefinitions: [{ id: 'phone', field: 'phone', filter: { model: Filters.inputMask, params: { mask: '000-000-0000' }}}]`);
    }

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString();

    // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement(filterTemplate, searchTerm);

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes

    this.$filterElm.on('keyup input change', (e: any) => {
      let value = '';
      if (e && e.target && e.target.value) {
        let targetValue = e.target.value;
        const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
        if (typeof targetValue === 'string' && enableWhiteSpaceTrim) {
          targetValue = targetValue.trim();
        }

        // if it has a mask, we need to do a bit more work
        // and replace the filter string by the masked output without triggering an event
        const unmaskedValue = this.unmaskValue(targetValue);
        const maskedValue = this.maskValue(unmaskedValue);
        value = unmaskedValue;

        if (e.keyCode >= 48) {
          this.$filterElm.val(maskedValue); // replace filter string with masked string
          e.preventDefault();
        }
      }

      if (this._clearFilterTriggered) {
        this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
        this.$filterElm.removeClass('filled');
      } else {
        this.$filterElm.addClass('filled');
        this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
      }
      // reset both flags for next use
      this._clearFilterTriggered = false;
      this._shouldTriggerQuery = true;
    });
  }

  /** From a regular string, we will use the mask to output a new string */
  private maskValue(inputValue: string): string {
    let i = 0;
    let maskedValue = '';

    if (this._inputMask) {
      maskedValue = this._inputMask.replace(/[09A]/gi, (match) => {
        // only replace the char when the mask is a 0 or 9 for a digit OR the mask is "A" and the char is a non-digit meaning a string char
        if (
          ((match === '0' || match === '9') && /\d+/g.test(inputValue[i]))    // mask is 0 or 9 and value is a digit
          || (match.toUpperCase() === 'A' && /[^\d]+/gi.test(inputValue[i]))  // OR mask is an "A" and value is non-digit
        ) {
          return inputValue[i++] || '';
        }
        return '';
      });
    }

    return maskedValue;
  }

  /** From a masked string, we will remove the mask and make a regular string again */
  private unmaskValue(maskedValue: string): string {
    // remove anything else but digits and chars from both the input mask and the input masked value for later comparison
    // e.g. (000) 000-0000 would return 0000000000
    const valueWithoutSymbols = maskedValue.replace(/[^0-9a-z]*/gi, '');
    const maskWithoutSymbols = this._inputMask.replace(/[^0-9a-z]*/gi, '');

    // then we can analyze if each char on each indexes equals what the mask requires, if not the char will be disregarded from the output
    // basically, if our mask is "0A0" and input value is "2ab", then only "2a" will be returned since the last char "b" is not part of the mask and is invalid
    let output = '';
    for (let i = 0; i < maskWithoutSymbols.length; i++) {
      if (valueWithoutSymbols[i]) {
        if (
          ((maskWithoutSymbols[i] === '0' || maskWithoutSymbols[i] === '9') && /\d+/g.test(valueWithoutSymbols[i]))    // mask is 0 or 9 and value is a digit
          || (maskWithoutSymbols[i].toUpperCase() === 'A' && /[^\d]+/gi.test(valueWithoutSymbols[i]))  // OR mask is an "A" and value is non-digit
        ) {
          output += valueWithoutSymbols[i]; // valid and matches the Mask, so we can add it up to the string output
        }
      }
    }

    return output;
  }
}
