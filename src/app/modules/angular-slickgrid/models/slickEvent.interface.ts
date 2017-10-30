export interface SlickEvent {
  notify: (Function) => (args: any, e: Event, scope: any) => Promise<any>;
  subscribe: (Function) => (e: any, args: any) => Promise<any>;
  unsubscribe: () => void;
}
