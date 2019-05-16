import { SumAggregator } from '../sumAggregator';

describe('sumAggregator', () => {
  let aggregator: SumAggregator;
  let dataset = [];

  beforeEach(() => {
    dataset = [
      { id: 0, title: 'Task 0', duration: '58', percentComplete: 55 },
      { id: 1, title: 'Task 1', duration: '14', percentComplete: 87 },
      { id: 2, title: 'Task 2', duration: '', percentComplete: 60 },
      { id: 3, title: 'Task 3', duration: '87', percentComplete: -2 },
      { id: 4, title: 'Task 4', duration: null, percentComplete: 15 },
    ];
  });

  it('should return null when the field provided does not exist', () => {
    // arrange
    const fieldName = 'invalid';
    const groupTotals = {};
    aggregator = new SumAggregator(fieldName);
    aggregator.init();

    // act
    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    // assert
    expect(0).toBe(groupTotals['sum'][fieldName]);
  });

  it('should return the sum value when the chosen field from the dataset contains only numbers', () => {
    const fieldName = 'percentComplete';
    const groupTotals = { sum: {} };
    aggregator = new SumAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    const avg = (55 + 87 + 60 + (-2) + 15);
    expect(avg).toBe(groupTotals.sum[fieldName]);
  });

  it('should return the sum valid number when dataset contains numbers provided as tring and other and invalid char', () => {
    const fieldName = 'duration';
    const groupTotals = { sum: {} };
    aggregator = new SumAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    const avg = 58 + 14 + 87;
    expect(avg).toBe(groupTotals.sum[fieldName]);
  });
});
