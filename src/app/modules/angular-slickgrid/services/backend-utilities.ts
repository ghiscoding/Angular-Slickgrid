import { GraphqlResult } from '../models/graphqlResult.interface';
import { BackendServiceApi } from '../models/backendServiceApi.interface';
import { GridOption } from '../models';

/** Execute the Backend Processes Callback, that could come from an Observable or a Promise callback */
export function executeBackendProcessesCallback(startTime: Date, processResult: GraphqlResult | any, backendApi: BackendServiceApi, gridOptions: GridOption): GraphqlResult | any {
  const endTime = new Date();

  // define what our internal Post Process callback, only available for GraphQL Service for now
  // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
  if (processResult && backendApi && backendApi.internalPostProcess) {
    backendApi.internalPostProcess(processResult);
  }

  // send the response process to the postProcess callback
  if (backendApi.postProcess) {
    if (processResult instanceof Object) {
      processResult.statistics = {
        startTime,
        endTime,
        executionTime: endTime.valueOf() - startTime.valueOf(),
        itemCount: gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems,
        totalItemCount: gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems
      };
    }
    backendApi.postProcess(processResult);
  }
}

/** On a backend service api error, we will run the "onError" if there is 1 provided or just throw back the error when nothing is provided */
export function  onBackendError(e: any, backendApi: BackendServiceApi) {
  if (backendApi && backendApi.onError) {
    backendApi.onError(e);
  } else {
    throw e;
  }
}
