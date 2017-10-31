import { dateUtcFilterCondition } from './dateUtcFilterCondition';
import { booleanFilterCondition } from './booleanFilterCondition';
import { FilterConditionOption } from './../models/filterConditionOption.interface';
import { FilterCondition } from '../models/filterCondition.interface';
import { dateIsoFilterCondition } from './dateIsoFilterCondition';
import { dateUsShortFilterCondition } from './dateUsShortFilterCondition';
import { dateUsFilterCondition } from './dateUsFilterCondition';
import { dateFilterCondition } from './dateFilterCondition';
import { numberFilterCondition } from './numberFilterCondition';
import { stringFilterCondition } from './stringFilterCondition';
import { FieldType } from '../models/index';

export const executeMappedCondition: FilterCondition = (options: FilterConditionOption) => {
  // execute the mapped type, or default to String condition check
  switch (options.fieldType) {
    case FieldType.boolean:
      return booleanFilterCondition(options);
    case FieldType.date:
      return dateFilterCondition(options);
    case FieldType.dateUtc:
      return dateUtcFilterCondition(options);
    case FieldType.dateIso:
      return dateIsoFilterCondition(options);
    case FieldType.dateUs:
    case FieldType.dateTimeUs:
      return dateUsFilterCondition(options);
    case FieldType.dateUsShort:
    case FieldType.dateTimeUsShort:
      return dateUsShortFilterCondition(options);
    case FieldType.number:
      return numberFilterCondition(options);
    case FieldType.string:
    default:
      return stringFilterCondition(options);
  }
};
