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
}
