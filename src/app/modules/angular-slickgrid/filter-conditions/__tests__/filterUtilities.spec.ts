import { compareObjects, testFilterCondition } from '../filterUtilities';

describe('filterUtilities', () => {
  describe('compareObjects method', () => {
    const obj1 = { id: 1, firstName: 'John', lastName: 'Doe', age: 26 };
    const obj2 = { id: 1, firstName: 'John', lastName: 'Doe', age: 26 };
    const obj3 = { id: 3, firstName: 'Bob', lastName: 'Smith' };
    const obj4 = { id: 1, firstName: 'John', lastName: 'Doe' };

    it('should return True when comparing 2 objects that are identical', () => {
      const output = compareObjects(obj1, obj2);
      expect(output).toBeTruthy();
    });

    it('should return True when comparing 2 objects by their "id" even if some of their properties are not identical', () => {
      const output = compareObjects(obj1, obj4, 'id');
      expect(output).toBeTruthy();
    });

    it('should return False when comparing 2 objects that have different property values', () => {
      const output = compareObjects(obj1, obj4);
      expect(output).toBeFalsy();
    });

    it('should return False when comparing 2 objects that have different amount of properties', () => {
      const output = compareObjects(obj1, obj3);
      expect(output).toBeFalsy();
    });

    it('should return False when first input is actually not an object', () => {
      const output = compareObjects('John', obj3, 'id');
      expect(output).toBeFalsy();
    });
  });

  describe('testFilterCondition method', () => {
    it('should return true when operator is not in any of the case', () => {
      // @ts-ignore
      const output = testFilterCondition('<==', 30, 10);
      expect(output).toBeTruthy();
    });

    it('should return True when value1 is "<" than value2', () => {
      const output1 = testFilterCondition('<', 3, 10);
      const output2 = testFilterCondition('LT', 3, 10);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
    });

    it('should return False when value1 is "<" than value2', () => {
      const output1 = testFilterCondition('<', 3, 1);
      const output2 = testFilterCondition('LT', 3, 1);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
    });

    it('should return True when value1 is "<=" than value2', () => {
      const output1 = testFilterCondition('<=', 3, 3);
      const output2 = testFilterCondition('LE', 3, 3);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
    });

    it('should return False when value1 is "<=" than value2', () => {
      const output1 = testFilterCondition('<=', 3, 1);
      const output2 = testFilterCondition('LE', 3, 1);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
    });

    it('should return True when value1 is ">" than value2', () => {
      const output1 = testFilterCondition('>', 10, 3);
      const output2 = testFilterCondition('GT', 10, 3);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
    });

    it('should return False when value1 is ">" than value2', () => {
      const output1 = testFilterCondition('>', 1, 3);
      const output2 = testFilterCondition('GT', 1, 3);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
    });

    it('should return True when value1 is ">=" than value2', () => {
      const output1 = testFilterCondition('>=', 3, 3);
      const output2 = testFilterCondition('GE', 3, 3);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
    });

    it('should return False when value1 is ">=" than value2', () => {
      const output1 = testFilterCondition('>=', 1, 3);
      const output2 = testFilterCondition('GE', 1, 3);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
    });

    it('should return True when value1 is Not Equal to value2', () => {
      const output1 = testFilterCondition('!=', 35, 3);
      const output2 = testFilterCondition('<>', 35, 3);
      const output3 = testFilterCondition('NE', 35, 3);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
      expect(output3).toBeTruthy();
    });

    it('should return False when value1 is inverse of Not Equal to value2', () => {
      const output1 = testFilterCondition('!=', 35, 35);
      const output2 = testFilterCondition('<>', 35, 35);
      const output3 = testFilterCondition('NE', 35, 35);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
      expect(output3).toBeFalsy();
    });

    it('should return True when value1 is Equal to value2', () => {
      const output1 = testFilterCondition('=', 35, 35);
      const output2 = testFilterCondition('==', 35, 35);
      const output3 = testFilterCondition('EQ', 35, 35);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
      expect(output3).toBeTruthy();
    });

    it('should return False when value1 is Equal to value2', () => {
      const output1 = testFilterCondition('=', 35, 5);
      const output2 = testFilterCondition('==', 35, 5);
      const output3 = testFilterCondition('EQ', 35, 5);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
      expect(output3).toBeFalsy();
    });

    it('should return True when value1 is "IN" value2 collection', () => {
      const output = testFilterCondition('IN', 'banana', ['melon', 'banana', 'orange']);
      expect(output).toBeTruthy();
    });

    it('should return False when value1 is not "IN" value2 collection', () => {
      const output = testFilterCondition('IN', 'raisin', ['melon', 'banana', 'orange']);
      expect(output).toBeFalsy();
    });

    it('should return False when value2 is not a collection or a string but required for "IN" operator', () => {
      const output1 = testFilterCondition('IN', 'raisin', 'melon');
      const output2 = testFilterCondition('IN', 'raisin', 99);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
    });

    it('should return True when value1 is "NOT_IN" value2 collection', () => {
      const output1 = testFilterCondition('NIN', 'raisin', ['melon', 'banana', 'orange']);
      const output2 = testFilterCondition('NOT_IN', 'raisin', ['melon', 'banana', 'orange']);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
    });

    it('should return False when value1 is inverse of "NOT_IN" value2 collection', () => {
      const output1 = testFilterCondition('NIN', 'banana', ['melon', 'banana', 'orange']);
      const output2 = testFilterCondition('NOT_IN', 'banana', ['melon', 'banana', 'orange']);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
    });

    it('should return False when value2 is not a collection or a string but required for "NOT_IN" operator', () => {
      const output = testFilterCondition('NOT_IN', 'raisin', 99);
      expect(output).toBeFalsy();
    });

    it('should return True when value1 is "IN_CONTAINS" value2 collection', () => {
      const output = testFilterCondition('IN_CONTAINS', 'Task2,Task3', ['Task2', 'Task3']);
      expect(output).toBeTruthy();
    });

    it('should return False when value1 is not "IN_CONTAINS" value2 collection', () => {
      const output = testFilterCondition('IN_CONTAINS', 'Task1,Task4', ['Task2', 'Task3']);
      expect(output).toBeFalsy();
    });

    it('should return False when is value2 not a collection', () => {
      const output = testFilterCondition('IN_CONTAINS', 'Task1,Task4', 'Task2');
      expect(output).toBeFalsy();
    });

    it('should return True when value1 is "NOT_IN_CONTAINS" value2 collection', () => {
      const output1 = testFilterCondition('NIN_CONTAINS', 'Task1,Task4', ['Task2', 'Task3']);
      const output2 = testFilterCondition('NOT_IN_CONTAINS', 'Task1,Task4', ['Task2', 'Task3']);

      expect(output1).toBeTruthy();
      expect(output2).toBeTruthy();
    });

    it('should return False when value1 is not "NOT_IN_CONTAINS" value2 collection', () => {
      const output1 = testFilterCondition('NIN_CONTAINS', 'Task2,Task3', ['Task2', 'Task3']);
      const output2 = testFilterCondition('NOT_IN_CONTAINS', 'Task2,Task3', ['Task2', 'Task3']);

      expect(output1).toBeFalsy();
      expect(output2).toBeFalsy();
    });

    it('should return False when value2 is not a collection', () => {
      const output = testFilterCondition('NOT_IN_CONTAINS', 'Task2,Task3', 'Task2');
      expect(output).toBeFalsy();
    });
  });
});
