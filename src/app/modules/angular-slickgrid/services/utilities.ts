/**
 * Unsubscribe all Observables Subscriptions
 * It will return an empty array if it all went well
 * @param subscriptions
 */
export function unsubscribeAllObservables(subscriptions: Array<{ unsubscribe: ()=> void; }>): Array<{ unsubscribe: ()=> void; }> {
  if (Array.isArray(subscriptions)) {
    let subscription = subscriptions.pop();
    while (subscription) {
      if (typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
      subscription = subscriptions.pop();
    }
  }

  return subscriptions;
}
