export interface SlickEvent {
    notify: (Function: any) => (args: any, e: Event, scope: any) => Promise<any>;
    subscribe: (Function: any) => (e: any, args: any) => Promise<any>;
    unsubscribe: () => void;
}
