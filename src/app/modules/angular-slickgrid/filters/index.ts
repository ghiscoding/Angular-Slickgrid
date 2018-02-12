import { Column, Filter } from './../models';
import { InputFilter } from './inputFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { SelectFilter } from './selectFilter';

export const Filters = {
  input: InputFilter,
  multipleSelect: MultipleSelectFilter,
  select: SelectFilter
};
