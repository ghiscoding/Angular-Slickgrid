import { Column } from './../models/column.interface';
import { checkboxFormatter } from './checkboxFormatter';
import { checkmarkFormatter } from './checkmarkFormatter';
import { dateIsoFormatter } from './dateIsoFormatter';
import { dateTimeIsoAmPmFormatter } from './dateTimeIsoAmPmFormatter';
import { dateTimeUsAmPmFormatter } from './dateTimeUsAmPmFormatter';
import { dateTimeUsFormatter } from './dateTimeUsFormatter';
import { dateUsFormatter } from './dateUsFormatter';
import { percentCompleteFormatter } from './percentCompleteFormatter';
import { percentCompleteBarFormatter } from './percentCompleteBarFormatter';
import { progressBarFormatter } from './progressBarFormatter';
import { yesNoFormatter } from './yesNoFormatter';
// import { Group, GroupTotals } from '../core'
// import { Item } from '../dataview'


/*
export interface GroupFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: Group): string
}

export interface GroupTotalsFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: GroupTotals): string
}
*/
export const Formatters = {
  checkbox: checkboxFormatter,
  checkmark: checkmarkFormatter,
  dateIso: dateIsoFormatter,
  dateTimeIso: dateIsoFormatter,
  dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
  dateUs: dateUsFormatter,
  dateTimeUs: dateTimeUsFormatter,
  dateTimeUsAmPm: dateTimeUsAmPmFormatter,
  percentComplete: percentCompleteFormatter,
  percentCompleteBar: percentCompleteBarFormatter,
  progressBar: progressBarFormatter,
  yesNo: yesNoFormatter
};
