import { Column, Filter } from './../models/index';
import { inputFilterTemplate } from './inputFilterTemplate';
import { selectFilterTemplate } from './selectFilterTemplate';

export const FilterTemplates = {
  input: inputFilterTemplate,
  select: selectFilterTemplate
};
