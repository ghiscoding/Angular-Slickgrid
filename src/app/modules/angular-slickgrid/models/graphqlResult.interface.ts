export interface GraphqlResult {
  data: {
    [datasetName: string]: {
      nodes: any[],
      pageInfo: {
        hasNextPage: boolean;
      },
      totalCount: number
    }
  };

  timestamps: {
    /** process start time */
    startTime: Date;

    /** process end time */
    endTime: Date;

    /** time it took to execute in millisecond */
    executionTime: number,
  };
}
