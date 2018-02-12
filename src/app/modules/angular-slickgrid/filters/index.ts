import { Column, Filter } from './../models';
import { InputFilter } from './inputFilter';
import { MultiSelectFilter } from './multiSelectFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { SelectFilter } from './selectFilter';

export const Filters = {
  input: InputFilter,
  multiSelect: MultiSelectFilter,
  multipleSelect: MultipleSelectFilter,
  select: SelectFilter
};
