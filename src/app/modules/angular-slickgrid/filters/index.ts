import { Column, Filter } from './../models/index';
import { InputFilter } from './inputFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { SelectFilter } from './selectFilter';
import { SingleSelectFilter } from './singleSelectFilter';

export const Filters = {
  input: InputFilter,
  multipleSelect: MultipleSelectFilter,
  singleSelect: SingleSelectFilter,
  select: SelectFilter
};
