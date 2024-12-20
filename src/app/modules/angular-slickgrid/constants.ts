import type { Locale } from '@slickgrid-universal/common';

export class Constants {
  // English Locale texts when using only 1 Locale instead of I18N
  static readonly locales: Locale = {
    TEXT_ALL_SELECTED: 'All Selected',
    TEXT_ALL_X_RECORDS_SELECTED: 'All {{x}} records selected',
    TEXT_APPLY_MASS_UPDATE: 'Apply Mass Update',
    TEXT_APPLY_TO_SELECTION: 'Update Selection',
    TEXT_CANCEL: 'Cancel',
    TEXT_CLEAR_ALL_FILTERS: 'Clear all Filters',
    TEXT_CLEAR_ALL_GROUPING: 'Clear all Grouping',
    TEXT_CLEAR_ALL_SORTING: 'Clear all Sorting',
    TEXT_CLEAR_PINNING: 'Unfreeze Columns/Rows',
    TEXT_CLONE: 'Clone',
    TEXT_COLLAPSE_ALL_GROUPS: 'Collapse all Groups',
    TEXT_CONTAINS: 'Contains',
    TEXT_COLUMNS: 'Columns',
    TEXT_COLUMN_RESIZE_BY_CONTENT: 'Resize by Content',
    TEXT_COMMANDS: 'Commands',
    TEXT_COPY: 'Copy',
    TEXT_EQUALS: 'Equals',
    TEXT_EQUAL_TO: 'Equal to',
    TEXT_ENDS_WITH: 'Ends With',
    TEXT_ERROR_EDITABLE_GRID_REQUIRED: 'Your grid must be editable in order to use the Composite Editor Modal.',
    TEXT_ERROR_ENABLE_CELL_NAVIGATION_REQUIRED:
      'Composite Editor requires the flag "enableCellNavigation" to be set to True in your Grid Options.',
    TEXT_ERROR_NO_CHANGES_DETECTED: 'Sorry we could not detect any changes.',
    TEXT_ERROR_NO_EDITOR_FOUND: 'We could not find any Editor in your Column Definition.',
    TEXT_ERROR_NO_RECORD_FOUND: 'No records selected for edit or clone operation.',
    TEXT_ERROR_ROW_NOT_EDITABLE: 'Current row is not editable.',
    TEXT_ERROR_ROW_SELECTION_REQUIRED: 'You must select some rows before trying to apply new value(s).',
    TEXT_EXPAND_ALL_GROUPS: 'Expand all Groups',
    TEXT_EXPORT_TO_CSV: 'Export in CSV format',
    TEXT_EXPORT_TO_TEXT_FORMAT: 'Export in Text format (Tab delimited)',
    TEXT_EXPORT_TO_EXCEL: 'Export to Excel',
    TEXT_EXPORT_TO_TAB_DELIMITED: 'Export in Text format (Tab delimited)',
    TEXT_FORCE_FIT_COLUMNS: 'Force fit columns',
    TEXT_FREEZE_COLUMNS: 'Freeze Columns',
    TEXT_GREATER_THAN: 'Greater than',
    TEXT_GREATER_THAN_OR_EQUAL_TO: 'Greater than or equal to',
    TEXT_GROUP_BY: 'Group By',
    TEXT_HIDE_COLUMN: 'Hide Column',
    TEXT_ITEMS: 'items',
    TEXT_ITEMS_PER_PAGE: 'items per page',
    TEXT_ITEMS_SELECTED: 'items selected',
    TEXT_OF: 'of',
    TEXT_OK: 'OK',
    TEXT_LAST_UPDATE: 'Last Update',
    TEXT_LESS_THAN: 'Less than',
    TEXT_LESS_THAN_OR_EQUAL_TO: 'Less than or equal to',
    TEXT_NO_ELEMENTS_FOUND: 'Aucun élément trouvé',
    TEXT_NOT_CONTAINS: 'Not contains',
    TEXT_NOT_EQUAL_TO: 'Not equal to',
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
    TEXT_TOGGLE_DARK_MODE: 'Toggle Dark Mode',
    TEXT_TOGGLE_FILTER_ROW: 'Toggle Filter Row',
    TEXT_TOGGLE_PRE_HEADER_ROW: 'Toggle Pre-Header Row',
    TEXT_X_OF_Y_SELECTED: '# of % selected',
    TEXT_X_OF_Y_MASS_SELECTED: '{{x}} of {{y}} selected',
  };

  static readonly treeDataProperties = {
    CHILDREN_PROP: 'children',
    COLLAPSED_PROP: '__collapsed',
    HAS_CHILDREN_PROP: '__hasChildren',
    TREE_LEVEL_PROP: '__treeLevel',
    PARENT_PROP: '__parentId',
  };

  // some Validation default texts
  static readonly VALIDATION_REQUIRED_FIELD = 'Field is required';
  static readonly VALIDATION_EDITOR_VALID_NUMBER = 'Please enter a valid number';
  static readonly VALIDATION_EDITOR_VALID_INTEGER = 'Please enter a valid integer number';
  static readonly VALIDATION_EDITOR_INTEGER_BETWEEN = 'Please enter a valid integer number between {{minValue}} and {{maxValue}}';
  static readonly VALIDATION_EDITOR_INTEGER_MAX = 'Please enter a valid integer number that is lower than {{maxValue}}';
  static readonly VALIDATION_EDITOR_INTEGER_MAX_INCLUSIVE =
    'Please enter a valid integer number that is lower than or equal to {{maxValue}}';
  static readonly VALIDATION_EDITOR_INTEGER_MIN = 'Please enter a valid integer number that is greater than {{minValue}}';
  static readonly VALIDATION_EDITOR_INTEGER_MIN_INCLUSIVE =
    'Please enter a valid integer number that is greater than or equal to {{minValue}}';
  static readonly VALIDATION_EDITOR_NUMBER_BETWEEN = 'Please enter a valid number between {{minValue}} and {{maxValue}}';
  static readonly VALIDATION_EDITOR_NUMBER_MAX = 'Please enter a valid number that is lower than {{maxValue}}';
  static readonly VALIDATION_EDITOR_NUMBER_MAX_INCLUSIVE =
    'Please enter a valid number that is lower than or equal to {{maxValue}}';
  static readonly VALIDATION_EDITOR_NUMBER_MIN = 'Please enter a valid number that is greater than {{minValue}}';
  static readonly VALIDATION_EDITOR_NUMBER_MIN_INCLUSIVE =
    'Please enter a valid number that is greater than or equal to {{minValue}}';
  static readonly VALIDATION_EDITOR_DECIMAL_BETWEEN = 'Please enter a valid number with a maximum of {{maxDecimal}} decimals';
  static readonly VALIDATION_EDITOR_TEXT_LENGTH_BETWEEN =
    'Please make sure your text length is between {{minLength}} and {{maxLength}} characters';
  static readonly VALIDATION_EDITOR_TEXT_MAX_LENGTH = 'Please make sure your text is less than {{maxLength}} characters';
  static readonly VALIDATION_EDITOR_TEXT_MAX_LENGTH_INCLUSIVE =
    'Please make sure your text is less than or equal to {{maxLength}} characters';
  static readonly VALIDATION_EDITOR_TEXT_MIN_LENGTH = 'Please make sure your text is more than {{minLength}} character(s)';
  static readonly VALIDATION_EDITOR_TEXT_MIN_LENGTH_INCLUSIVE =
    'Please make sure your text is at least {{minLength}} character(s)';
}
