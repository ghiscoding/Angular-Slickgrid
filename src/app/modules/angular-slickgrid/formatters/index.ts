import { Column } from './../models/index';
// import { Group, GroupTotals } from '../core'
// import { Item } from '../dataview'
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { checkboxFormatter } from './checkboxFormatter';
import { checkmarkFormatter } from './checkmarkFormatter';
import { complexObjectFormatter } from './complexObjectFormatter';
import { dateIsoFormatter } from './dateIsoFormatter';
import { dateTimeIsoAmPmFormatter } from './dateTimeIsoAmPmFormatter';
import { dateTimeUsAmPmFormatter } from './dateTimeUsAmPmFormatter';
import { dateTimeUsFormatter } from './dateTimeUsFormatter';
import { dateUsFormatter } from './dateUsFormatter';
import { deleteIconFormatter } from './deleteIconFormatter';
import { editIconFormatter } from './editIconFormatter';
import { hyperlinkFormatter } from './hyperlinkFormatter';
import { infoIconFormatter } from './infoIconFormatter';
import { lowercaseFormatter } from './lowercaseFormatter';
import { multipleFormatter } from './multipleFormatter';
import { percentCompleteFormatter } from './percentCompleteFormatter';
import { percentCompleteBarFormatter } from './percentCompleteBarFormatter';
import { progressBarFormatter } from './progressBarFormatter';
import { translateFormatter } from './translateFormatter';
import { translateBooleanFormatter } from './translateBooleanFormatter';
import { uppercaseFormatter } from './uppercaseFormatter';
import { yesNoFormatter } from './yesNoFormatter';

/*
export interface GroupFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: Group): string
}
export interface GroupTotalsFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: GroupTotals): string
}
*/

/** Provides a list of different Formatters that will change the cell value displayed in the UI */
export const Formatters = {
  /** Takes an array of string and converts it to a comma delimited string */
  arrayToCsv: arrayToCsvFormatter,

  /** When value is filled (true), it will display a checkbox Unicode icon */
  checkbox: checkboxFormatter,

  /** When value is filled (true), it will display a Font-Awesome icon (fa-check) */
  checkmark: checkmarkFormatter,

  /** Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John") */
  complexObject: complexObjectFormatter,

  /** Takes a Date object and displays it as an ISO Date format */
  dateIso: dateIsoFormatter,

  /** Takes a Date object and displays it as an ISO Date+Time format */
  dateTimeIso: dateIsoFormatter,

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

  /** Displays a Font-Awesome edit icon (fa-pencil) */
  editIcon: editIconFormatter,

  /** Takes a cell value and transforms it into an hyperlink, given that the value starts with 1 of these (http|ftp|https) */
  hyperlink: hyperlinkFormatter,

  /** Displays a Font-Awesome edit icon (fa-info-circle) */
  infoIcon: infoIconFormatter,

  /** Takes a value and displays it all lowercase */
  lowercase: lowercaseFormatter,

  /**
   * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters. For example::
   * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
   */
  multiple: multipleFormatter,

  /** Takes a cell value number (between 0-100) and displays a red (<50) or green (>=50) bar */
  percentComplete: percentCompleteFormatter,

  /** Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
  percentCompleteBar: percentCompleteBarFormatter,

  /** Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
  progressBar: progressBarFormatter,

  /** Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `params: { i18n: this.translate } */
  translate: translateFormatter,

  /** Takes a boolean value, cast it to upperCase string and finally translates it (i18n). */
  translateBoolean: translateBooleanFormatter,

  /** Takes a value and displays it all uppercase */
  uppercase: uppercaseFormatter,

  /** Takes a boolean value and display a string 'Yes' or 'No' */
  yesNo: yesNoFormatter
};
