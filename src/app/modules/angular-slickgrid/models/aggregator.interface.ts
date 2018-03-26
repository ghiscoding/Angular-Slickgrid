export interface Aggregator {
  init: () => void;
  accumulate: (item: any) => void;
  storeResult?: (groupTotals: any) => void;
}
