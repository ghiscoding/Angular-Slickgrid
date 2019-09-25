export interface Metrics {
  /** process start time */
  startTime: Date;

  /** process end time */
  endTime?: Date;

  /** time it took to execute in millisecond */
  executionTime?: number;

  /** number of items displayed */
  itemCount?: number;

  /** Total count of items in dataset or in database (if used with a BackendServiceApi) */
  totalItemCount: number;
}
