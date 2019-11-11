import { isObservable } from 'rxjs';

import { BackendServiceApi, EmitterType, GraphqlResult, GridOption } from '../models';

/**
 * Execute the backend callback, which are mainly the "process" & "postProcess" methods.
 * Also note that "preProcess" was executed prior to this callback
 */
export async function executeBackendCallback(backendServiceApi: BackendServiceApi, query: string, args: any, startTime: Date, totalItems: number, emitActionChangedCallback: (type: EmitterType) => void) {
  if (backendServiceApi) {
    // emit an onFilterChanged event when it's not called by a clear filter
    if (args && !args.clearFilterTriggered) {
      emitActionChangedCallback(EmitterType.remote);
    }

    // the processes can be Observables (like HttpClient) or Promises
    const process = backendServiceApi.process(query);
    if (process instanceof Promise && process.then) {
      process.then((processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendServiceApi, totalItems))
        .catch((error: any) => onBackendError(error, backendServiceApi));
    } else if (isObservable(process)) {
      process.subscribe(
        (processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendServiceApi, totalItems),
        (error: any) => onBackendError(error, backendServiceApi)
      );
    }
  }
}

/** Execute the Backend Processes Callback, that could come from an Observable or a Promise callback */
export function executeBackendProcessesCallback(startTime: Date, processResult: GraphqlResult | any, backendApi: BackendServiceApi, totalItems: number): GraphqlResult | any {
  const endTime = new Date();

  // define what our internal Post Process callback, only available for GraphQL Service for now
  // it will basically refresh the Dataset & Pagination removing the need for the user to always create his own PostProcess every time
  if (processResult && backendApi && backendApi.internalPostProcess) {
    backendApi.internalPostProcess(processResult);
  }

  // send the response process to the postProcess callback
  if (backendApi.postProcess) {
    if (processResult instanceof Object) {
      processResult.metrics = {
        startTime,
        endTime,
        executionTime: endTime.valueOf() - startTime.valueOf(),
        itemCount: totalItems,
        totalItemCount: totalItems
      };
      // @deprecated
      processResult.statistics = processResult.metrics;
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

/** Refresh the dataset through the Backend Service */
export function refreshBackendDataset(backendApi: BackendServiceApi, gridOptions: GridOption) {
  let query = '';

  if (!backendApi || !backendApi.service || !backendApi.process) {
    throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
  }

  if (backendApi.service) {
    query = backendApi.service.buildQuery();
  }

  if (query && query !== '') {
    // keep start time & end timestamps & return it after process execution
    const startTime = new Date();

    if (backendApi.preProcess) {
      backendApi.preProcess();
    }

    // the processes can be Promises or Observables (like Angular HttpClient)
    const process = backendApi.process(query);
    if (process instanceof Promise && process.then) {
      process.then((processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, gridOptions.pagination.totalItems))
        .catch((error: any) => onBackendError(error, backendApi));
    } else if (isObservable(process)) {
      process.subscribe(
        (processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, gridOptions.pagination.totalItems),
        (error: any) => onBackendError(error, backendApi)
      );
    }
  }
}
