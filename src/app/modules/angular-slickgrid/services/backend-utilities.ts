import { BackendServiceApi, EmitterType, GraphqlResult, GridOption } from '../models';
import { isObservable } from 'rxjs';

/**
 * Execute the backend callback, which are mainly the "process" & "postProcess" methods.
 * Also note that "preProcess" was executed prior to this callback
 */
export async function executeBackendCallback(query: string, args: any, startTime: Date, gridOptions: GridOption, emitActionChangedCallback: (type: EmitterType) => void) {
  const backendApi = gridOptions && gridOptions.backendServiceApi;

  if (backendApi) {
    // emit an onFilterChanged event when it's not called by a clear filter
    if (args && !args.clearFilterTriggered) {
      emitActionChangedCallback(EmitterType.remote);
    }

    // the processes can be Observables (like HttpClient) or Promises
    const process = backendApi.process(query);
    if (process instanceof Promise && process.then) {
      process.then((processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, gridOptions))
        .catch((error: any) => onBackendError(error, backendApi));
    } else if (isObservable(process)) {
      process.subscribe(
        (processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, gridOptions),
        (error: any) => onBackendError(error, backendApi)
      );
    }
  }
}

/** Execute the Backend Processes Callback, that could come from an Observable or a Promise callback */
export function executeBackendProcessesCallback(startTime: Date, processResult: GraphqlResult | any, backendApi: BackendServiceApi, gridOptions: GridOption): GraphqlResult | any {
  const endTime = new Date();

  // define what our internal Post Process callback, only available for GraphQL Service for now
  // it will basically refresh the Dataset & Pagination removing the need for the user to always create his own PostProcess every time
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
export function onBackendError(e: any, backendApi: BackendServiceApi) {
  if (backendApi && backendApi.onError) {
    backendApi.onError(e);
  } else {
    throw e;
  }
}
