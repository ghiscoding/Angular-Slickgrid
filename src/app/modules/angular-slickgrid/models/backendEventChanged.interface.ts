import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

export interface BackendEventChanged {
  preProcess?: () => void;
  process: (query: string) => Promise<any> | Observable<any>;
  postProcess: (response: any) => void;
  service: any;
  filterTypingDebounce?: number;
}
