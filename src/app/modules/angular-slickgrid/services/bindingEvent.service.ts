import { ElementEventListener } from '../models/elementEventListener.interface';

export class BindingEventService {
  private _boundedEvents: ElementEventListener[] = [];

  /** Bind an event listener to any element */
  bind(element: Element, eventName: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    element.addEventListener(eventName, listener, options);
    this._boundedEvents.push({ element, eventName, listener });
  }

  /** Unbind all will remove every every event handlers that were bounded earlier */
  unbindAll() {
    while (this._boundedEvents.length > 0) {
      const boundedEvent = this._boundedEvents.pop() as ElementEventListener;
      const { element, eventName, listener } = boundedEvent;
      if (element && element.removeEventListener) {
        element.removeEventListener(eventName, listener);
      }
    }
  }
}
