import { multiSelectFilterPostCreation } from './multiSelectFilterPostCreation';
import { Column, Filter } from './../models';
import { inputFilterTemplate } from './inputFilterTemplate';
import { multiSelectFilterTemplate } from './multiSelectFilterTemplate';
import { selectFilterTemplate } from './selectFilterTemplate';

export const FilterTemplates = {
  input: inputFilterTemplate,
  multiSelect: multiSelectFilterTemplate,
  multiSelectPostCreation: multiSelectFilterPostCreation,
  select: selectFilterTemplate
};
