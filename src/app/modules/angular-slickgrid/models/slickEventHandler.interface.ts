import { SlickEvent } from './index';

export interface SlickEventHandler {
  /** Subscribe to a SlickGrid Event and execute its handler callback */
  subscribe: (slickEvent: SlickEvent, handler: any) => SlickEventHandler;

  /** Unsubscribe to a SlickGrid Event and execute its handler callback */
  unsubscribe: (slickEvent: SlickEvent, handler: any) => SlickEventHandler;

  /** Unsubscribe and remove all SlickGrid Event Handlers */
  unsubscribeAll: () => SlickEventHandler;
}
