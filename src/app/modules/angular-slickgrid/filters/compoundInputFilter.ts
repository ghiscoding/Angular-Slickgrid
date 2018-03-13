import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldType } from './../models/fieldType';
import { Column, Filter, FilterArguments, FilterCallback, GridOption, OperatorString, OperatorType, SearchTerm } from './../models/index';
import $ from 'jquery';
import { htmlEntityEncode } from '..';

// using external non-typed js libraries
declare var $: any;

@Injectable()
export class CompoundInputFilter implements Filter {
  private $filterElm: any;
  private $filterInputElm: any;
  private $selectOperatorElm: any;
  grid: any;
  gridOptions: GridOption;
  operator: OperatorType | OperatorString;
  searchTerm: SearchTerm;
  columnDef: Column;
  callback: FilterCallback;

  constructor(private translate: TranslateService) {}

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.operator = args.operator;
    this.searchTerm = args.searchTerm;
    if (this.grid && typeof this.grid.getOptions === 'function') {
      this.gridOptions = this.grid.getOptions();
    }

    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
    // and initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement();

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this.$filterInputElm.keyup((e: any) => {
      this.onTriggerEvent(e);
    });
    this.$selectOperatorElm.change((e: any) => {
      this.onTriggerEvent(e);
    });
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

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      this.$filterElm.off('keyup').remove();
    }
  }

  /**
   * Set value(s) on the DOM element
   */
  setValues(values: SearchTerm) {
    if (values) {
      this.$filterElm.val(values);
    }
  }

  //
  // private functions
  // ------------------

  private buildInputHtmlString() {
    const placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    return `<input class="form-control" type="text" placeholder="${placeholder}" />`;
  }

  private buildSelectOperatorHtmlString() {
    const optionValues = this.getOptionValues();
    let optionValueString = '';
    optionValues.forEach((option) => {
      optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
    });

    return `<select class="form-control">${optionValueString}</select>`;
  }

  private getOptionValues(): {operator: OperatorString, description: string }[] {
    const type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
    let optionValues = [];

    switch (type) {
      case FieldType.string:
        optionValues = [
          { operator: '', description: this.translate.instant('CONTAINS') },
          { operator: '=', description: this.translate.instant('EQUALS') },
          { operator: 'a*', description: this.translate.instant('STARTS_WITH') },
          { operator: '*z', description: this.translate.instant('ENDS_WITH') },
          /*
          { operator: 'IN', description: this.translate.instant('IN_COLLECTION_SEPERATED_BY_COMMA') },
          { operator: 'NIN', description: this.translate.instant('NOT_IN_COLLECTION_SEPERATED_BY_COMMA') },
          */
        ];
        break;
      default:
        optionValues = [
          { operator: '', description: this.translate.instant('CONTAINS') },
          { operator: '=', description: '' },
          { operator: '<', description: '' },
          { operator: '<=', description: '' },
          { operator: '>', description: '' },
          { operator: '>=', description: '' },
          { operator: '<>', description: '' }];
        break;
    }

    return optionValues;
  }

  /**
   * Create the DOM element
   */
  private createDomElement() {
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    // create the DOM Select dropdown for the Operator
    this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
    this.$filterInputElm = $(this.buildInputHtmlString());
    const $filterContainerElm = $(`<div class="form-group search-filter"></div>`);
    const $containerInputGroup = $(`<div class="input-group"></div>`);
    const $operatorInputGroupAddon = $(`<div class="input-group-addon operator"></div>`);

    /* the DOM element final structure will be
      <div class="input-group">
        <div class="input-group-addon operator">
          <select class="form-control"></select>
        </div>
        <input class="form-control" type="text" />
      </div>
    */
    $operatorInputGroupAddon.append(this.$selectOperatorElm);
    $containerInputGroup.append($operatorInputGroupAddon);
    $containerInputGroup.append(this.$filterInputElm);

    // create the DOM element & add an ID and filter class
    $filterContainerElm.append($containerInputGroup);
    $filterContainerElm.attr('id', `filter-${this.columnDef.id}`);

    const searchTerm = (typeof this.searchTerm === 'boolean') ? `${this.searchTerm}` : this.searchTerm;
    this.$filterInputElm.val(searchTerm);
    this.$filterInputElm.data('columnId', this.columnDef.id);

    if (this.operator) {
      this.$selectOperatorElm.val(this.operator);
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (this.searchTerm) {
      $filterContainerElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
      $filterContainerElm.appendTo($headerElm);
    }

    return $filterContainerElm;
  }

  private onTriggerEvent(e: Event | undefined) {
    const selectedOperator = this.$selectOperatorElm.find('option:selected').text();
    const value = this.$filterInputElm.val();
    (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
    this.callback(e, { columnDef: this.columnDef, searchTerm: value, operator: selectedOperator || '' });
  }
}
