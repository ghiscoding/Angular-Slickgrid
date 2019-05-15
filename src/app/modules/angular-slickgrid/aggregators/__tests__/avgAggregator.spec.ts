import { AvgAggregator } from '../avgAggregator';

describe('avgAggregator', () => {
  let aggregator: AvgAggregator;
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

  it('should return undefined when the field provided does not exist', () => {
    // arrange
    const fieldName = 'invalid';
    const groupTotals = {};
    aggregator = new AvgAggregator(fieldName);
    aggregator.init();

    // act
    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    // assert
    expect(undefined).toBe(groupTotals['avg'][fieldName]);
  });

  it('should calculate an average when the chosen field from the dataset contains only numbers', () => {
    const fieldName = 'percentComplete';
    const groupTotals = { avg: {} };
    aggregator = new AvgAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    const avg = (55 + 87 + 60 + (-2) + 15) / 5;
    expect(avg).toBe(groupTotals.avg[fieldName]);
  });

  it('should calculate an average with only the valid numbers when dataset contains numbers provided as tring and other and invalid char', () => {
    const fieldName = 'duration';
    const groupTotals = { avg: {} };
    aggregator = new AvgAggregator(fieldName);
    aggregator.init();

    dataset.forEach((row) => aggregator.accumulate(row));
    aggregator.storeResult(groupTotals);

    const avg = (58 + 14 + 87) / 3;
    expect(avg).toBe(groupTotals.avg[fieldName]);
  });
});
