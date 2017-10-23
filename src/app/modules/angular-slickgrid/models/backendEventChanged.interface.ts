export interface BackendEventChanged {
  preProcess?: () => void;
  process: (query: string) => Promise<any>;
  postProcess: (response: any) => void;
  service: any;
  filterTypingDebounce?: number;
}
