import { Column, FieldType, SortDirectionNumber } from './../../models';
import { sortByFieldType } from '../sorterUtilities';
import { Sorters } from '..';

describe('sorterUtilities', () => {
  it('should call the Sorters.numeric when FieldType is number', () => {
    const spy = jest.spyOn(Sorters, 'numeric');
    sortByFieldType(0, 4, FieldType.number, SortDirectionNumber.asc, { id: 'field1', field: 'field1' });
    expect(spy).toHaveBeenCalledWith(0, 4, SortDirectionNumber.asc);
  });

  it('should call the Sorters.date when FieldType is date', () => {
    const spy = jest.spyOn(Sorters, 'date');
    sortByFieldType('1998-08-08', '1998-08-09 01:01:10', FieldType.date, SortDirectionNumber.asc, { id: 'field1', field: 'field1' });
    expect(spy).toHaveBeenCalledWith('1998-08-08', '1998-08-09 01:01:10', SortDirectionNumber.asc);
  });

  it('should call the Sorters.dateIso when FieldType is dateIso', () => {
    const spy = jest.spyOn(Sorters, 'dateIso');
    sortByFieldType('1998-08-08', '1998-08-09 01:01:10', FieldType.dateIso, SortDirectionNumber.asc, { id: 'field1', field: 'field1' });
    expect(spy).toHaveBeenCalledWith('1998-08-08', '1998-08-09 01:01:10', SortDirectionNumber.asc);
  });

  it('should call the Sorters.dateEuro when FieldType is dateEuro', () => {
    const spy = jest.spyOn(Sorters, 'dateEuro');
    sortByFieldType('08/08/1998', '08/10/1998', FieldType.dateEuro, SortDirectionNumber.asc, { id: 'field1', field: 'field1' });
    expect(spy).toHaveBeenCalledWith('08/08/1998', '08/10/1998', SortDirectionNumber.asc);
  });

  it('should call the Sorters.dateEuroShort when FieldType is dateEuroShort', () => {
    const spy = jest.spyOn(Sorters, 'dateEuroShort');
    sortByFieldType('01/01/18', '14/12/98', FieldType.dateEuroShort, SortDirectionNumber.asc, { id: 'field1', field: 'field1' });
    expect(spy).toHaveBeenCalledWith('01/01/18', '14/12/98', SortDirectionNumber.asc);
  });

  it('should call the Sorters.dateUs when FieldType is dateUs', () => {
    const spy = jest.spyOn(Sorters, 'dateUs');
    sortByFieldType('08/08/1998', '10/08/1998', FieldType.dateUs, SortDirectionNumber.asc, { id: 'field1', field: 'field1' });
    expect(spy).toHaveBeenCalledWith('08/08/1998', '10/08/1998', SortDirectionNumber.asc);
  });

  it('should call the Sorters.dateUsShort when FieldType is dateUsShort', () => {
    const spy = jest.spyOn(Sorters, 'dateUsShort');
    sortByFieldType('8/8/98', '10/8/98', FieldType.dateUsShort, SortDirectionNumber.asc, { id: 'field1', field: 'field1' });
    expect(spy).toHaveBeenCalledWith('8/8/98', '10/8/98', SortDirectionNumber.asc);
  });

  it('should call the Sorters.objectString when FieldType is objectString', () => {
    const object1 = { firstName: 'John', lastName: 'Z' };
    const object2 = { firstName: 'Jane', lastName: 'Doe' };
    const mockColumn = { id: 'field1', field: 'field1', dataKey: 'firstName' } as Column;
    const spy = jest.spyOn(Sorters, 'objectString');
    sortByFieldType(object1, object2, FieldType.object, SortDirectionNumber.asc, mockColumn);
    expect(spy).toHaveBeenCalledWith(object1, object2, SortDirectionNumber.asc, mockColumn);
  });
});
