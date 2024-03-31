import type { Handler, SlickEvent, SlickEventData } from '@slickgrid-universal/common';
type MergeTypes<A, B> = { [key in keyof A]: key extends keyof B ? B[key] : A[key]; } & B;

// @ts-ignore
export class MockSlickEvent<ArgType = any> implements SlickEvent {
  protected handlers: Handler<any>[] = [];

  notify(args: ArgType, event?: SlickEventData | Event | MergeTypes<SlickEventData, Event> | null, scope?: any) {
    scope = scope || this;

    let returnValue: any;
    for (let i = 0; i < this.handlers.length; i++) {
      returnValue = this.handlers[i].call(scope, event as SlickEventData, args);
    }

    return returnValue;
  }

  subscribe(handler: Handler<ArgType>): any {
    this.handlers.push(handler);
  }

  unsubscribe(handler?: Handler<ArgType>) {
    this.handlers.forEach((handlerFn, index) => {
      if (handlerFn === handler) {
        this.handlers.splice(index, 1);
      }
    });
  }
}

export class MockSlickEventHandler {
  protected handlers: any[] = [];

  notify(eventName: string, data?: any) {
    const pubSub = this.handlers.find(subscription => subscription.name === eventName);
    if (typeof pubSub?.handler === 'function') {
      pubSub.handler(data);
    }
  }

  subscribe<T = any>(event: MockSlickEvent, handler: Handler<T>): any {
    this.handlers.push({ event, handler });
    if (event.subscribe) {
      event.subscribe(handler);
    }

    return this;
  }

  unsubscribe<T = any>(event: MockSlickEvent, handler: Handler<T>) {
    let i = this.handlers.length;
    while (i--) {
      if (this.handlers[i].event === event &&
        this.handlers[i].handler === handler) {
        this.handlers.splice(i, 1);
        if (event.unsubscribe) {
          event.unsubscribe(handler);
        }
        break;
      }
    }

    return this;  // allow chaining
  }

  unsubscribeAll() {
    let i = this.handlers.length;
    while (i--) {
      if (this.handlers[i].event.unsubscribe) {
        this.handlers[i].event.unsubscribe(this.handlers[i].handler);
      }
    }
    this.handlers = [];

    return this;  // allow chaining
  }
}
