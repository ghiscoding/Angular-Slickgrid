import { MaxAggregator } from '../maxAggregator';

describe('maxAggregator', () => {
  let aggregator: MaxAggregator;
  let dataset = [];

  beforeEach(() => {
    dataset = [
      { id: 0, title: 'Task 0', duration: '58', percentComplete: 55 },
      { id: 1, title: 'Task 1', duration: '14', percentComplete: 87 },
      { id: 2, title: 'Task 2', duration: '', percentComplete: 60 },
      { id: 3, title: 'Task 3', duration: '897', percentComplete: -2 },
      { id: 4, title: 'Task 4', duration: null, percentComplete: 15 },
    ];
  });

  it('should return null when the field provided does not exist', () => {
    // arrange
    const fieldName = 'invalid';
    const groupTotals = {};
    aggregator = new MaxAggregator(fieldName);
    aggregator.init();

    // act
    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    // assert
    expect(null).toBe(groupTotals['max'][fieldName]);
  });

  it('should return the maximum value when the chosen field from the dataset contains only numbers', () => {
    const fieldName = 'percentComplete';
    const groupTotals = { max: {} };
    aggregator = new MaxAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    expect(87).toBe(groupTotals.max[fieldName]);
  });

  it('should return the maximum valid number when dataset contains numbers provided as tring and other and invalid char', () => {
    const fieldName = 'duration';
    const groupTotals = { max: {} };
    aggregator = new MaxAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    expect(897).toBe(groupTotals.max[fieldName]);
  });
});
