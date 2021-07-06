import { of, Subscription } from 'rxjs';

import { unsubscribeAllObservables, } from '../utilities';

describe('Service/Utilies', () => {
  describe('unsubscribeAllObservables method', () => {
    it('should return original array when array of subscriptions is empty', () => {
      const output = unsubscribeAllObservables([]);
      expect(output).toEqual([]);
    });

    it('should return unique values when input array has duplicate objects', () => {
      const subscriptions: Subscription[] = [];
      const observable1 = of([1, 2]);
      const observable2 = of([1, 2]);
      subscriptions.push(observable1.subscribe(), observable2.subscribe());
      const output = unsubscribeAllObservables(subscriptions);
      expect(output).toHaveLength(0);
    });
  });
});
