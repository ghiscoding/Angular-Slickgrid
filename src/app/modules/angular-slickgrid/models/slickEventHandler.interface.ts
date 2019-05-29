export interface SlickEventHandler {
  subscribe: (event: string, fn: any) => SlickEventHandler;
  unsubscribe: (event: string, fn: any) => SlickEventHandler;
  unsubscribeAll: () => SlickEventHandler;
}
