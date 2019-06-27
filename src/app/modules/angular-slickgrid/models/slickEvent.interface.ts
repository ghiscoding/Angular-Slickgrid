import { SlickEventData } from './slickEventData.interface';

export interface SlickEvent {
  /**
   * Fires an event notifying all subscribers.
   * @param args Additional data object to be passed to all handlers.
   * @param eventData Optional.
   *      An EventData object to be passed to all handlers.
   *      For DOM events, an existing W3C/jQuery event object can be passed in.
   * @param scope Optional.
   *      The scope ("this") within which the handler will be executed.
   *      If not specified, the scope will be set to the Event instance.
   */
  notify: (args: any, eventData?: SlickEventData, scope?: any) => Promise<any>;

  /**
   * Adds an event handler to be called when the event is fired.
   * Event handler will receive two arguments - an EventData and the Data
   * object the event was fired with.
   * @param fn {Function} Event handler.
   */
  subscribe: (fn: any) => Promise<any>;

  /**
   * Removes an event handler added with <code>subscribe(fn).
   * @param fn {Function} Event handler to be removed.
   */
  unsubscribe: (fn: any) => void;
}
