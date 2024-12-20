import type { RxJsFacade } from '@slickgrid-universal/common';
import {
  EMPTY,
  iif,
  isObservable,
  firstValueFrom,
  Observable,
  type ObservableInput,
  of,
  type OperatorFunction,
  type ObservedValueOf,
  Subject,
  switchMap,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class RxJsResourceStub implements RxJsFacade {
  readonly className = 'RxJsResource';

  /**
   * The same Observable instance returned by any call to without a scheduler.
   * This returns the EMPTY constant from RxJS
   */
  get EMPTY(): Observable<never> {
    return EMPTY;
  }

  /** Simple method to create an Observable */
  createObservable<T>(): Observable<T> {
    return new Observable<T>();
  }

  /** Simple method to create a Subject */
  createSubject<T>(): Subject<T> {
    return new Subject<T>();
  }

  /** same Observable instance returned by any call to without a scheduler. It is preferrable to use this over empty() */
  empty(): Observable<never> {
    return EMPTY;
  }

  firstValueFrom<T>(source: Observable<T>): Promise<T> {
    return firstValueFrom(source);
  }

  iif<T = never, F = never>(condition: () => boolean, trueResult?: any, falseResult?: any): Observable<T | F> {
    return iif<T, F>(condition, trueResult, falseResult);
  }

  /** Tests to see if the object is an RxJS Observable */
  isObservable(obj: any): boolean {
    return isObservable(obj);
  }

  /** Converts the arguments to an observable sequence. */
  of(value: any): Observable<any> {
    return of(value);
  }

  switchMap<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>> {
    return switchMap(project);
  }

  /** Emits the values emitted by the source Observable until a `notifier` Observable emits a value. */
  takeUntil<T>(notifier: Observable<any>): any {
    return takeUntil<T>(notifier);
  }
}
