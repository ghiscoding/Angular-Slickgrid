import { isObservable } from 'rxjs';

import { BackendServiceApi, EmitterType, GraphqlResult, GridOption } from '../models';

const main: any = {};

/** Execute the Backend Processes Callback, that could come from an Observable or a Promise callback */
main.executeBackendProcessesCallback = function exeBackendProcessesCallback(startTime: Date, processResult: GraphqlResult | any, backendApi: BackendServiceApi, totalItems: number): GraphqlResult | any {
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
};

/** On a backend service api error, we will run the "onError" if there is 1 provided or just throw back the error when nothing is provided */
main.onBackendError = function backendError(e: any, backendApi: BackendServiceApi) {
  if (backendApi && backendApi.onError) {
    backendApi.onError(e);
  } else {
    throw e;
  }
};

/**
 * Execute the backend callback, which are mainly the "process" & "postProcess" methods.
 * Also note that "preProcess" was executed prior to this callback
 */
main.executeBackendCallback = function exeBackendCallback(backendServiceApi: BackendServiceApi, query: string, args: any, startTime: Date, totalItems: number, emitActionChangedCallback?: (type: EmitterType) => void) {
  if (backendServiceApi) {
    // emit an onFilterChanged event when it's not called by a clear filter
    if (args && !args.clearFilterTriggered) {
      emitActionChangedCallback(EmitterType.remote);
    }

    // the processes can be Observables (like HttpClient) or Promises
    const process = backendServiceApi.process(query);
    if (process instanceof Promise && process.then) {
      process.then((processResult: GraphqlResult | any) => main.executeBackendProcessesCallback(startTime, processResult, backendServiceApi, totalItems))
        .catch((error: any) => main.onBackendError(error, backendServiceApi));
    } else if (isObservable(process)) {
      process.subscribe(
        (processResult: GraphqlResult | any) => main.executeBackendProcessesCallback(startTime, processResult, backendServiceApi, totalItems),
        (error: any) => main.onBackendError(error, backendServiceApi)
      );
    }
  }
};

/** Refresh the dataset through the Backend Service */
main.refreshBackendDataset = function refreshBackend(gridOptions: GridOption) {
  let query = '';
  const backendApi = gridOptions && gridOptions.backendServiceApi;

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

    const totalItems = gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems;
    main.executeBackendCallback(backendApi, query, null, startTime, totalItems);
  }
};

// export all methods & the main so that it works in all modules but also in Jest unit test
// export every method as independent constant so that it still works whenever this is used in other modules
export const executeBackendProcessesCallback = main.executeBackendProcessesCallback;
export const onBackendError = main.onBackendError;
export const executeBackendCallback = main.executeBackendCallback;
export const refreshBackendDataset = main.refreshBackendDataset;

export default main;
