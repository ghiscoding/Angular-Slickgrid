import { Statistic } from './statistic.interface';
export interface GraphqlResult {
    data: {
        [datasetName: string]: {
            nodes: any[];
            pageInfo: {
                hasNextPage: boolean;
            };
            totalCount: number;
        };
    };
    statistics?: Statistic;
}
