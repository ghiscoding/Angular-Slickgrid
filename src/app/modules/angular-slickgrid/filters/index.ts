import { Column, Filter } from './../models';
import { InputFilter } from './inputFilter';
import { MultiSelectFilter } from './multiSelectFilter';
import { SelectFilter } from './selectFilter';

export const Filters = {
  input: InputFilter,
  multiSelect: MultiSelectFilter,
  select: SelectFilter
};
