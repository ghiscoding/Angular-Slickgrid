import { EventNamingStyle, EventSubscription, PubSubService, titleCase, toKebabCase } from '@slickgrid-universal/common';

interface PubSubEvent {
  name: string;
  listener: (event: CustomEventInit) => void;
}

export class EventPubSubService implements PubSubService {
  private _elementSource: Element;
  private _subscribedEvents: PubSubEvent[] = [];

  eventNamingStyle = EventNamingStyle.camelCase;

  get subscribedEvents(): PubSubEvent[] {
    return this._subscribedEvents;
  }

  get subscribedEventNames(): string[] {
    return this._subscribedEvents.map((pubSubEvent) => pubSubEvent.name);
  }

  constructor(elementSource?: Element) {
    // use the provided element
    // or create a "phantom DOM node" (a div element that is never rendered) to set up a custom event dispatching
    this._elementSource = elementSource || document.createElement('div');
  }

  /**
   * Method to publish a message via a dispatchEvent.
   * We return the dispatched event in a Promise with a delayed cycle and we do this because
   * most framework require a cycle before the binding is processed and binding a spinner end up showing too late
   * for example this is used for these events: onBeforeFilterClear, onBeforeFilterChange, onBeforeToggleTreeCollapse, onBeforeSortChange
   * @param event The event or channel to publish to.
   * @param data The data to publish on the channel.
   */
  publish<T = any>(eventName: string, data?: T): Promise<boolean> {
    const eventNameByConvention = this.getEventNameByNamingConvention(eventName, '');

    return new Promise(resolve => {
      const isDispatched = this.dispatchCustomEvent<T>(eventNameByConvention, data, true, false);
      setTimeout(() => resolve(isDispatched), 0);
    });
  }

  /**
   * Subscribes to a message channel or message type.
   * @param event The event channel or event data type.
   * @param callback The callback to be invoked when the specified message is published.
   * @return possibly a Subscription
   */
  subscribe<T = any>(eventName: string, callback: (data: any) => void): any {
    const eventNameByConvention = this.getEventNameByNamingConvention(eventName, '');

    // the event listener will return the data in the "event.detail", so we need to return its content to the final callback
    // basically we substitute the "data" with "event.detail" so that the user ends up with only the "data" result
    this._elementSource.addEventListener(eventNameByConvention, (event: CustomEventInit<T>) => callback.call(null, event.detail as T));
    this._subscribedEvents.push({ name: eventNameByConvention, listener: callback });
  }

  /**
   * Subscribes to a custom event message channel or message type.
   * This is similar to the "subscribe" except that the callback receives an event typed as CustomEventInit and the data will be inside its "event.detail"
   * @param event The event channel or event data type.
   * @param callback The callback to be invoked when the specified message is published.
   * @return possibly a Subscription
   */
  subscribeEvent<T = any>(eventName: string, listener: (event: CustomEventInit<T>) => void): any | void {
    const eventNameByConvention = this.getEventNameByNamingConvention(eventName, '');
    this._elementSource.addEventListener(eventNameByConvention, listener);
    this._subscribedEvents.push({ name: eventNameByConvention, listener });
  }

  /**
   * Unsubscribes a message name
   * @param event The event name
   * @return possibly a Subscription
   */
  unsubscribe(eventName: string, listener: (event: CustomEventInit) => void) {
    const eventNameByConvention = this.getEventNameByNamingConvention(eventName, '');
    this._elementSource.removeEventListener(eventNameByConvention, listener);
  }

  /** Unsubscribes all subscriptions that currently exists */
  unsubscribeAll(subscriptions?: EventSubscription[]) {
    if (Array.isArray(subscriptions)) {
      for (const subscription of subscriptions) {
        if (subscription?.dispose) {
          subscription.dispose();
        } else if (subscription?.unsubscribe) {
          subscription.unsubscribe();
        }
      }
    } else {
      for (const pubSubEvent of this._subscribedEvents) {
        this.unsubscribe(pubSubEvent.name, pubSubEvent.listener);
      }
    }
  }

  /** Dispatch of Custom Event, which by default will bubble up & is cancelable */
  dispatchCustomEvent<T = any>(eventName: string, data?: T, isBubbling = true, isCancelable = true) {
    const eventInit: CustomEventInit<T> = { bubbles: isBubbling, cancelable: isCancelable };
    if (data) {
      eventInit.detail = data;
    }
    return this._elementSource.dispatchEvent(new CustomEvent<T>(eventName, eventInit));
  }

  /** Get the event name by the convention defined, it could be: all lower case, camelCase, PascalCase or kebab-case */
  getEventNameByNamingConvention(inputEventName: string, eventNamePrefix: string) {
    let outputEventName = '';

    switch (this.eventNamingStyle) {
      case EventNamingStyle.camelCase:
        outputEventName = (eventNamePrefix !== '') ? `${eventNamePrefix}${titleCase(inputEventName)}` : inputEventName;
        break;
      case EventNamingStyle.kebabCase:
        outputEventName = (eventNamePrefix !== '') ? `${eventNamePrefix}-${toKebabCase(inputEventName)}` : toKebabCase(inputEventName);
        break;
      case EventNamingStyle.lowerCase:
        outputEventName = `${eventNamePrefix}${inputEventName}`.toLowerCase();
        break;
      case EventNamingStyle.lowerCaseWithoutOnPrefix:
        outputEventName = `${eventNamePrefix}${inputEventName.replace(/^on/, '')}`.toLowerCase();
        break;
    }
    return outputEventName;
  }
}
