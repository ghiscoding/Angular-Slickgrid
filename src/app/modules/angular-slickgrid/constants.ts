import { Locale } from './models/locale.interface';

export class Constants {
  static locales: Locale = {
    TEXT_ALL_SELECTED: 'All Selected',
    TEXT_CANCEL: 'Cancel',
    TEXT_CLEAR_ALL_FILTERS: 'Clear All Filters',
    TEXT_CLEAR_ALL_SORTING: 'Clear All Sorting',
    TEXT_CONTAINS: 'Contains',
    TEXT_COLUMNS: 'Columns',
    TEXT_COMMANDS: 'Commands',
    TEXT_EQUALS: 'Equals',
    TEXT_ENDS_WITH: 'Ends With',
    TEXT_EXPORT_IN_CSV_FORMAT: 'Export in CSV format',
    TEXT_EXPORT_IN_TEXT_FORMAT: 'Export in Text format (Tab delimited)',
    TEXT_EXPORT_TO_EXCEL: 'Export to Excel',
    TEXT_FORCE_FIT_COLUMNS: 'Force fit columns',
    TEXT_GROUP_BY: 'Group By',
    TEXT_HIDE_COLUMN: 'Hide Column',
    TEXT_ITEMS: 'items',
    TEXT_ITEMS_PER_PAGE: 'items per page',
    TEXT_OF: 'of',
    TEXT_OK: 'OK',
    TEXT_PAGE: 'Page',
    TEXT_REFRESH_DATASET: 'Refresh Dataset',
    TEXT_REMOVE_FILTER: 'Remove Filter',
    TEXT_REMOVE_SORT: 'Remove Sort',
    TEXT_SAVE: 'Save',
    TEXT_SELECT_ALL: 'Select All',
    TEXT_SYNCHRONOUS_RESIZE: 'Synchronous resize',
    TEXT_SORT_ASCENDING: 'Sort Ascending',
    TEXT_SORT_DESCENDING: 'Sort Descending',
    TEXT_STARTS_WITH: 'Starts With',
    TEXT_TOGGLE_FILTER_ROW: 'Toggle Filter Row',
    TEXT_TOGGLE_PRE_HEADER_ROW: 'Toggle Pre-Header Row',
    TEXT_X_OF_Y_SELECTED: '# of % selected',
  };
  static VALIDATION_REQUIRED_FIELD = 'Field is required';
  static VALIDATION_EDITOR_VALID_NUMBER = 'Please enter a valid number';
  static VALIDATION_EDITOR_VALID_INTEGER = 'Please enter a valid integer number';
  static VALIDATION_EDITOR_INTEGER_BETWEEN = 'Please enter a valid integer number between {{minValue}} and {{maxValue}}';
  static VALIDATION_EDITOR_INTEGER_MAX = 'Please enter a valid integer number that is lower than {{maxValue}}';
  static VALIDATION_EDITOR_INTEGER_MIN = 'Please enter a valid integer number that is greater than {{minValue}}';
  static VALIDATION_EDITOR_NUMBER_BETWEEN = 'Please enter a valid number between {{minValue}} and {{maxValue}}';
  static VALIDATION_EDITOR_NUMBER_MAX = 'Please enter a valid number that is lower than {{maxValue}}';
  static VALIDATION_EDITOR_NUMBER_MIN = 'Please enter a valid number that is greater than {{minValue}}';
  static VALIDATION_EDITOR_DECIMAL_BETWEEN = 'Please enter a valid number with a maximum of {{maxDecimal}} decimals';
}
