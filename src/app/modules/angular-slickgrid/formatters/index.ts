import { Column } from './../models/index';
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { boldFormatter } from './boldFormatter';
import { checkboxFormatter } from './checkboxFormatter';
import { checkmarkFormatter } from './checkmarkFormatter';
import { collectionFormatter } from './collectionFormatter';
import { complexObjectFormatter } from './complexObjectFormatter';
import { dateIsoFormatter } from './dateIsoFormatter';
import { dateTimeIsoFormatter } from './dateTimeIsoFormatter';
import { dateTimeIsoAmPmFormatter } from './dateTimeIsoAmPmFormatter';
import { dateTimeUsAmPmFormatter } from './dateTimeUsAmPmFormatter';
import { dateTimeUsFormatter } from './dateTimeUsFormatter';
import { dateUsFormatter } from './dateUsFormatter';
import { deleteIconFormatter } from './deleteIconFormatter';
import { dollarColoredBoldFormatter } from './dollarColoredBoldFormatter';
import { dollarColoredFormatter } from './dollarColoredFormatter';
import { dollarFormatter } from './dollarFormatter';
import { editIconFormatter } from './editIconFormatter';
import { hyperlinkFormatter } from './hyperlinkFormatter';
import { hyperlinkUriPrefixFormatter } from './hyperlinkUriPrefixFormatter';
import { infoIconFormatter } from './infoIconFormatter';
import { lowercaseFormatter } from './lowercaseFormatter';
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

/** Provides a list of different Formatters that will change the cell value displayed in the UI */
export const Formatters = {
  /** Takes an array of string and converts it to a comma delimited string */
  arrayToCsv: arrayToCsvFormatter,

  /** show value in bold font weight as well */
  bold: boldFormatter,

  /** When value is filled (true), it will display a checkbox Unicode icon */
  checkbox: checkboxFormatter,

  /** When value is filled (true), it will display a Font-Awesome icon (fa-check) */
  checkmark: checkmarkFormatter,

  /** Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John") */
  complexObject: complexObjectFormatter,

  /**
   * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
   * @example
   * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
   * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
   * const dataset = [{ value: 1 },{ value: 2 }];
   */
  collection: collectionFormatter,

  /** Takes a Date object and displays it as an ISO Date format */
  dateIso: dateIsoFormatter,

  /** Takes a Date object and displays it as an ISO Date+Time format */
  dateTimeIso: dateTimeIsoFormatter,

  /** Takes a Date object and displays it as an ISO Date+Time+(am/pm) format */
  dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,

  /** Takes a Date object and displays it as an US Date format */
  dateUs: dateUsFormatter,

  /** Takes a Date object and displays it as an US Date+Time format */
  dateTimeUs: dateTimeUsFormatter,

  /** Takes a Date object and displays it as an US Date+Time+(am/pm) format */
  dateTimeUsAmPm: dateTimeUsAmPmFormatter,

  /** Displays a Font-Awesome delete icon (fa-trash) */
  deleteIcon: deleteIconFormatter,

  /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value */
  dollar: dollarFormatter,

  /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value */
  dollarColored: dollarColoredFormatter,

  /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well */
  dollarColoredBold: dollarColoredBoldFormatter,

  /** Displays a Font-Awesome edit icon (fa-pencil) */
  editIcon: editIconFormatter,

  /** Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https). The structure will be "<a href="hyperlink">hyperlink</a>" */
  hyperlink: hyperlinkFormatter,

  /** Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"  */
  hyperlinkUriPrefix: hyperlinkUriPrefixFormatter,

  /** Displays a Font-Awesome edit icon (fa-info-circle) */
  infoIcon: infoIconFormatter,

  /** Takes a value and displays it all lowercase */
  lowercase: lowercaseFormatter,

  /**
   * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters. For example::
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
