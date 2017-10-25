import { BackendService } from './index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

export interface BackendEventChanged {
  onInit?: (query: string) => Promise<any> | Observable<any>;
  preProcess?: () => void;
  process: (query: string) => Promise<any> | Observable<any>;
  postProcess: (response: any) => void;
  service: BackendService;
  filterTypingDebounce?: number;
}
