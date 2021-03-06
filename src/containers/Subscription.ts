// code from react-redux v5.0.0-beta.3
// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

import {Store} from 'redux';

type AnyStore = Store<any>;

type VoidFunction = () => void;

type ListenerCollection = {
  clear: VoidFunction;
  notify: VoidFunction;
  subscribe: (listener: VoidFunction) => VoidFunction
}

function createListenerCollection(): ListenerCollection {
  type Listeners = VoidFunction[];

  let current: Listeners = [];
  let next: Listeners = [];
  let cleared = false;

  return {
    clear() {
      next = [];
      current = [];
      cleared = true;
    },

    notify() {
      const listeners = current = next;
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },

    subscribe(listener: VoidFunction) {
      let isSubscribed = true;
      if (next === current) {
        next = current.slice();
      }
      next.push(listener);

      return () => {
        if (!isSubscribed || cleared) {
          return;
        }
        isSubscribed = false;

        if (next === current) {
          next = current.slice();
        }
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

class Subscription {
  private subscribe: ((arg: VoidFunction) => VoidFunction);
  private unsubscribe: VoidFunction | undefined;
  private onStateChange: VoidFunction;
  private listeners: ListenerCollection;

  constructor(store: AnyStore, parentSub?: Subscription) {
    this.subscribe = parentSub
      ? parentSub.addNestedSub.bind(parentSub)
      : store.subscribe.bind(store);
    this.unsubscribe = undefined;
    this.listeners = createListenerCollection();
  }

  setOnStateChange(fun: VoidFunction) {
    this.onStateChange = fun;
  }

  addNestedSub(listener: VoidFunction) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  }

  notifyNestedSubs() {
    this.listeners.notify();
  }

  isSubscribed() {
    return Boolean(this.unsubscribe);
  }

  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.subscribe(this.onStateChange);
    }
  }

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.listeners.clear();
    }
    this.unsubscribe = undefined;
    this.subscribe = undefined as any;
  }
}

export default Subscription;
