import { BackendServiceApi } from './backendServiceApi.interface';
import { OdataOption } from './odataOption.interface';
import { GridOdataService } from '../services';

export interface OdataServiceApi extends BackendServiceApi {
  /** Backend Service Options */
  options?: Partial<OdataOption>;

  /** Backend Service instance (could be OData or GraphQL Service) */
  service: GridOdataService;
}
