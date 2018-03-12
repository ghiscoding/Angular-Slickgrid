import { Column, Filter } from './../models/index';
import { CompoundDateFilter } from './compoundDateFilter';
import { CompoundInputFilter } from './compoundInputFilter';
import { InputFilter } from './inputFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { SelectFilter } from './selectFilter';
import { SingleSelectFilter } from './singleSelectFilter';

export const Filters = {
  /** Default Filter, input type text filter with a magnifying glass placeholder */
  input: InputFilter,

  /** Multiple Select filter, which uses 3rd party lib "multiple-select.js" */
  multipleSelect: MultipleSelectFilter,

  /** Single Select filter, which uses 3rd party lib "multiple-select.js" */
  singleSelect: SingleSelectFilter,

  /** Select filter, which uses native DOM element select */
  select: SelectFilter,

  /** Compound Date Filter (compound of Operator + Date picker) */
  compoundDate: CompoundDateFilter,

  /** Compound Input Filter (compound of Operator + Input) */
  compoundInput: CompoundInputFilter,
};
