import { Column, Filter } from './../models/index';
import { InputFilter } from './inputFilter';
import { InputNoPlaceholderFilter } from './inputNoPlaceholderFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { SelectFilter } from './selectFilter';
import { SingleSelectFilter } from './singleSelectFilter';

export const Filters = {
  /** Default Filter, input type text filter with a magnifying glass placeholder */
  input: InputFilter,

  /** Same as inputFilter, input type text filter, but without placeholder */
  inputNoPlaceholder: InputNoPlaceholderFilter,

  /** Multiple Select filter, which uses 3rd party lib "multiple-select.js" */
  multipleSelect: MultipleSelectFilter,

  /** Single Select filter, which uses 3rd party lib "multiple-select.js" */
  singleSelect: SingleSelectFilter,

  /** Select filter, which uses native DOM element select */
  select: SelectFilter
};
