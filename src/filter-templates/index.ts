import { Column } from './../models/column.interface';
import { Filter } from './../models/filter.interface';
import { inputFilterTemplate } from './inputFilterTemplate';
import { selectFilterTemplate } from './selectFilterTemplate';

export const FilterTemplates = {
  input: inputFilterTemplate,
  select: selectFilterTemplate
};
