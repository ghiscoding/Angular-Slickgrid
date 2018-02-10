import { FilterArguments } from './../models/filterArguments.interface';
import { FilterCallback } from './../models/filterCallback.interface';
import { Column, Filter } from './../models';
import $ from 'jquery';

export class InputFilter implements Filter {
  private $filterElm: any;
  grid: any;
  searchTerm: string | number;
  columnDef: Column;
  callback: FilterCallback;

  constructor() {}

  /**
   * Initialize the filter template
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerm = args.searchTerm;

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString();

    // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement(filterTemplate);

    // step 3, subscribe to the keyup event and run the callback when that happens
    this.$filterElm.keyup((e: any) => this.callback(e, { columnDef: this.columnDef }));
  }

  /**
   * Clear the filter value
   */
  clear(triggerFilterKeyup = true) {
    if (this.$filterElm) {
      this.$filterElm.val('');
      if (triggerFilterKeyup) {
        this.$filterElm.trigger('keyup');
      }
    }
  }

  //
  // private functions
  // ------------------

  /**
   * Create the HTML template as a string
   */
  private buildTemplateHtmlString() {
    return `<input type="text" class="form-control search-filter" style="font-family: Segoe UI Symbol;" placeholder="&#128269;">`;
  }

  /**
   * From the html template string, create a DOM element
   * @param filterTemplate
   */
  private createDomElement(filterTemplate: string) {
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    const $filterElm = $(filterTemplate);
    $filterElm.val(this.searchTerm);
    $filterElm.attr('id', `filter-${this.columnDef.id}`);
    $filterElm.data('columnId', this.columnDef.id);

    // append the new DOM element to the header row
    if ($filterElm && typeof $filterElm.appendTo === 'function') {
      $filterElm.appendTo($headerElm);
    }

    return $filterElm;
  }
}
