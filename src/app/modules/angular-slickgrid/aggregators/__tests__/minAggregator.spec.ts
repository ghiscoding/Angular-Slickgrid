import { MinAggregator } from '../minAggregator';

describe('minAggregator', () => {
  let aggregator: MinAggregator;
  let dataset = [];

  beforeEach(() => {
    dataset = [
      { id: 0, title: 'Task 0', duration: '58', percentComplete: 55 },
      { id: 1, title: 'Task 1', duration: '14', percentComplete: 87 },
      { id: 2, title: 'Task 2', duration: '', percentComplete: 60 },
      { id: 3, title: 'Task 3', duration: '91', percentComplete: -2 },
      { id: 4, title: 'Task 4', duration: null, percentComplete: 15 },
    ];
  });

  it('should return null when the field provided does not exist', () => {
    // arrange
    const fieldName = 'invalid';
    const groupTotals = {};
    aggregator = new MinAggregator(fieldName);
    aggregator.init();

    // act
    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    // assert
    expect(null).toBe(groupTotals['min'][fieldName]);
  });

  it('should return the minimum value when the chosen field from the dataset contains only numbers', () => {
    const fieldName = 'percentComplete';
    const groupTotals = { min: {} };
    aggregator = new MinAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    expect(-2).toBe(groupTotals.min[fieldName]);
  });

  it('should return the minimum valid number when dataset contains numbers provided as tring and other and invalid char', () => {
    const fieldName = 'duration';
    const groupTotals = { min: {} };
    aggregator = new MinAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    expect(14).toBe(groupTotals.min[fieldName]);
  });
});
