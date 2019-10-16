import { Column, FieldType, SortDirectionNumber, Sorter } from './../models/index';
import { Sorters } from './index';
import { getAssociatedDateSorter } from './dateUtilities';

export function sortByFieldType(fieldType: FieldType, value1: any, value2: any, sortDirection: number | SortDirectionNumber, sortColumn?: Column) {
  let sortResult = 0;

  switch (fieldType) {
    case FieldType.float:
    case FieldType.integer:
    case FieldType.number:
      sortResult = Sorters.numeric(value1, value2, sortDirection);
      break;
    case FieldType.date:
    case FieldType.dateIso:
    case FieldType.dateUtc:
    case FieldType.dateTime:
    case FieldType.dateTimeIso:
    case FieldType.dateTimeIsoAmPm:
    case FieldType.dateTimeIsoAM_PM:
    case FieldType.dateTimeShortIso:
    case FieldType.dateEuro:
    case FieldType.dateEuroShort:
    case FieldType.dateTimeShortEuro:
    case FieldType.dateTimeEuro:
    case FieldType.dateTimeEuroAmPm:
    case FieldType.dateTimeEuroAM_PM:
    case FieldType.dateTimeEuroShort:
    case FieldType.dateTimeEuroShortAmPm:
    case FieldType.dateTimeEuroShortAM_PM:
    case FieldType.dateUs:
    case FieldType.dateUsShort:
    case FieldType.dateTimeShortUs:
    case FieldType.dateTimeUs:
    case FieldType.dateTimeUsAmPm:
    case FieldType.dateTimeUsAM_PM:
    case FieldType.dateTimeUsShort:
    case FieldType.dateTimeUsShortAmPm:
    case FieldType.dateTimeUsShortAM_PM:
      sortResult = getAssociatedDateSorter(fieldType).call(this, value1, value2, sortDirection);
      break;
    case FieldType.object:
      sortResult = Sorters.objectString(value1, value2, sortDirection, sortColumn);
      break;
    default:
      sortResult = Sorters.string(value1, value2, sortDirection);
      break;
  }

  return sortResult;
}
