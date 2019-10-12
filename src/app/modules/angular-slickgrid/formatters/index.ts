import { FieldType } from '../models/index';
import { getAssociatedDateFormatter } from './formatterUtilities';
import { arrayObjectToCsvFormatter } from './arrayObjectToCsvFormatter';
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { boldFormatter } from './boldFormatter';
import { checkboxFormatter } from './checkboxFormatter';
import { checkmarkFormatter } from './checkmarkFormatter';
import { collectionFormatter } from './collectionFormatter';
import { collectionEditorFormatter } from './collectionEditorFormatter';
import { complexObjectFormatter } from './complexObjectFormatter';
import { decimalFormatter } from './decimalFormatter';
import { deleteIconFormatter } from './deleteIconFormatter';
import { dollarColoredBoldFormatter } from './dollarColoredBoldFormatter';
import { dollarColoredFormatter } from './dollarColoredFormatter';
import { dollarFormatter } from './dollarFormatter';
import { editIconFormatter } from './editIconFormatter';
import { hyperlinkFormatter } from './hyperlinkFormatter';
import { iconFormatter } from './iconFormatter';
import { infoIconFormatter } from './infoIconFormatter';
import { italicFormatter } from './italicFormatter';
import { lowercaseFormatter } from './lowercaseFormatter';
import { maskFormatter } from './maskFormatter';
import { multipleFormatter } from './multipleFormatter';
import { percentFormatter } from './percentFormatter';
import { percentCompleteBarFormatter } from './percentCompleteBarFormatter';
import { percentCompleteFormatter } from './percentCompleteFormatter';
import { percentSymbolFormatter } from './percentSymbolFormatter';
import { progressBarFormatter } from './progressBarFormatter';
import { translateFormatter } from './translateFormatter';
import { translateBooleanFormatter } from './translateBooleanFormatter';
import { uppercaseFormatter } from './uppercaseFormatter';
import { yesNoFormatter } from './yesNoFormatter';
import { bsDropdownFormatter } from './bsDropdownFormatter';

/** Provides a list of different Formatters that will change the cell value displayed in the UI */
export const Formatters = {
  /**
   * Takes an array of complex objects converts it to a comma delimited string.
   * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
   * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
   * { params: { propertyNames: ['firtName'] }}
   */
  arrayObjectToCsv: arrayObjectToCsvFormatter,

  /** Takes an array of string and converts it to a comma delimited string */
  arrayToCsv: arrayToCsvFormatter,

  /** show value in bold font weight */
  bold: boldFormatter,

  /** boostrap dropdown formatter */
  bsDropdown : bsDropdownFormatter,

  /** When value is filled (true), it will display a checkbox Unicode icon */
  checkbox: checkboxFormatter,

  /** When value is filled (true), it will display a Font-Awesome icon (fa-check) */
  checkmark: checkmarkFormatter,

  /**
   * Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John")
   * You can pass the complex structure in the "field" or the "params: { complexField: string }" properties.
   * For example::
   * this.columnDefs = [{ id: 'username', field: 'user.firstName', ... }]
   * OR this.columnDefs = [{ id: 'username', field: 'user', params: { complexField: 'user.firstName' }, ... }]
   */
  complexObject: complexObjectFormatter,

  /**
   * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
   * @example
   * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
   * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
   * const dataset = [1, 2];
   */
  collection: collectionFormatter,

  /**
   * Roughly the same as the "collectionFormatter" except that it
   * looks up values from the columnDefinition.editor.collection (instead of params) property and displays the label in CSV or string format
   * @example
   * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
   * { editor: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
   * const dataset = [1, 2];
   */
  collectionEditor: collectionEditorFormatter,

  /** Takes a Date object and displays it as an ISO Date format (YYYY-MM-DD) */
  dateIso: getAssociatedDateFormatter(FieldType.dateIso, '-'),

  /** Takes a Date object and displays it as an ISO Date+Time format (YYYY-MM-DD HH:mm:ss) */
  dateTimeIso: getAssociatedDateFormatter(FieldType.dateTimeIso, '-'),

  /** Takes a Date object and displays it as an ISO Date+Time (without seconds) format (YYYY-MM-DD HH:mm) */
  dateTimeShortIso: getAssociatedDateFormatter(FieldType.dateTimeShortIso, '-'),

  /** Takes a Date object and displays it as an ISO Date+Time+(am/pm) format (YYYY-MM-DD h:mm:ss a) */
  dateTimeIsoAmPm: getAssociatedDateFormatter(FieldType.dateTimeIsoAmPm, '-'),

  /** Takes a Date object and displays it as an Euro Date format (DD/MM/YYYY) */
  dateEuro: getAssociatedDateFormatter(FieldType.dateEuro, '/'),

  /** Takes a Date object and displays it as an Euro Date+Time format (DD/MM/YYYY HH:mm:ss) */
  dateTimeEuro: getAssociatedDateFormatter(FieldType.dateTimeEuro, '/'),

  /** Takes a Date object and displays it as an Euro Date+Time (without seconds) format (DD/MM/YYYY HH:mm) */
  dateTimeShortEuro: getAssociatedDateFormatter(FieldType.dateTimeShortEuro, '/'),

  /** Takes a Date object and displays it as an Euro Date+Time+(am/pm) format (DD/MM/YYYY hh:mm:ss a) */
  dateTimeEuroAmPm: getAssociatedDateFormatter(FieldType.dateTimeEuroAmPm, '/'),

  /** Takes a Date object and displays it as an US Date format (MM/DD/YYYY) */
  dateUs: getAssociatedDateFormatter(FieldType.dateUs, '/'),

  /** Takes a Date object and displays it as an US Date+Time format (MM/DD/YYYY HH:mm:ss) */
  dateTimeUs: getAssociatedDateFormatter(FieldType.dateTimeUs, '/'),

  /** Takes a Date object and displays it as an US Date+Time (without seconds) format (MM/DD/YYYY HH:mm:ss) */
  dateTimeShortUs: getAssociatedDateFormatter(FieldType.dateTimeShortUs, '/'),

  /** Takes a Date object and displays it as an US Date+Time+(am/pm) format (MM/DD/YYYY hh:mm:ss a) */
  dateTimeUsAmPm: getAssociatedDateFormatter(FieldType.dateTimeUsAmPm, '/'),

  /** Displays a Font-Awesome delete icon (fa-trash) */
  deleteIcon: deleteIconFormatter,

  /**
   * Display the value as x decimals formatted, defaults to 2 decimals.
   * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
   * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
   * The property "decimalPlaces" is an alias of "minDecimalPlaces"
   */
  decimal: decimalFormatter,

  /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value */
  dollar: dollarFormatter,

  /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value */
  dollarColored: dollarColoredFormatter,

  /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well */
  dollarColoredBold: dollarColoredBoldFormatter,

  /** Displays a Font-Awesome edit icon (fa-pencil) */
  editIcon: editIconFormatter,

  /**
   * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https).
   * The structure will be "<a href="hyperlink">hyperlink</a>"
   *
   * You can optionally change the hyperlink text displayed by using the generic params "hyperlinkText" in the column definition
   * For example: { id: 'link', field: 'link', params: { hyperlinkText: 'Company Website' } } will display "<a href="link">Company Website</a>"
   *
   * You can also optionally provide the hyperlink URL by using the generic params "hyperlinkUrl" in the column definition
   * For example: { id: 'link', field: 'link', params: {  hyperlinkText: 'Company Website', hyperlinkUrl: 'http://www.somewhere.com' } } will display "<a href="http://www.somewhere.com">Company Website</a>"
   */
  hyperlink: hyperlinkFormatter,

  /** Display whichever icon you want (library agnostic, it could be Font-Awesome or any other) */
  icon: iconFormatter,

  /** Displays a Font-Awesome edit icon (fa-info-circle) */
  infoIcon: infoIconFormatter,

  /** show input text value as italic text */
  italic: italicFormatter,

  /** Takes a value and displays it all lowercase */
  lowercase: lowercaseFormatter,

  /**
   * Takes a value display it according to a mask provided
   * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
   */
  mask: maskFormatter,

  /**
   * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters.
   * Requires to pass an array of "formatters" in the column definition the generic "params" property
   * For example::
   * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
   */
  multiple: multipleFormatter,

  /** Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar */
  percent: percentFormatter,

  /** Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar */
  percentComplete: percentCompleteFormatter,

  /** Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
  percentCompleteBar: percentCompleteBarFormatter,

  /** Takes a cell value number (between 0-100) and add the "%" after the number */
  percentSymbol: percentSymbolFormatter,

  /** Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
  progressBar: progressBarFormatter,

  /** Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate */
  translate: translateFormatter,

  /** Takes a boolean value, cast it to upperCase string and finally translates it (i18n). */
  translateBoolean: translateBooleanFormatter,

  /** Takes a value and displays it all uppercase */
  uppercase: uppercaseFormatter,

  /** Takes a boolean value and display a string 'Yes' or 'No' */
  yesNo: yesNoFormatter
};
