/**
 * Unsubscribe all Observables Subscriptions
 * It will return an empty array if it all went well
 * @param subscriptions
 */
export function unsubscribeAllObservables(subscriptions: Array<{ unsubscribe: () => void }>): any[] {
  if (Array.isArray(subscriptions)) {
    let subscription = subscriptions.pop();
    while (subscription) {
      if (typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
      subscription = subscriptions.pop();
    }
  }

  // TODO: deprecated, remove the return type in next major version
  return subscriptions;
}
