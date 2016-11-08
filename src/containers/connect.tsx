import * as React from 'react';
const {Component, PropTypes} = React;
import {isEqual} from 'lodash';

import storeShape from './storeShape';

// import * as renders from './connectRenders';

import Subscription from './Subscription';

import {createSelector, TypeSelector} from './createSelector';

import {TPWStore, TConnectorsObject} from '../kernel/baseTypes';

type ConnectSettings = {
  storeKey?: string,
  shouldHandleStateChanges?: boolean
};

let hotReloadingVersion = 0;

export function connect<TOwnProps>(connectors: TConnectorsObject, settings: ConnectSettings = {}) {
  const {
    storeKey = 'store',
    shouldHandleStateChanges = true,
  } = settings;

  const subscriptionKey = `${storeKey}Subscription`;
  const version = hotReloadingVersion++;

  // tslint:disable-next-line:only-arrow-functions
  return function wrapWithConnect(WrappedComponent: any) {
    class Connect extends Component<TOwnProps, {}> {
      static contextTypes: any;
      static childContextTypes: any;

      private selector: TypeSelector<TOwnProps>;
      private version: number;
      // private renderCount: number = 0;
      private store: TPWStore;

      private subscription: Subscription;
      private parentSub?: Subscription;

      public context: {
        [index: string]: any
      };

      constructor(props: TOwnProps, context: {}) {
        super(props, context);
        this.version = version;
        this.store = this.context[storeKey];
        this.parentSub = this.context[subscriptionKey];

        this.initSelector();
        this.initSubscription();
      }

      getChildContext() {
        return {
          [subscriptionKey]: this.subscription,
        };
      }

      public componentWillUpdate: any;

      public componentDidMount() {
        if (!shouldHandleStateChanges) {
          return;
        }
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        // if (this.selector.shouldComponentUpdate) {
        //  this.forceUpdate();
        // }
      }

      public componentWillReceiveProps(nextProps: TOwnProps) {
        if (!isEqual(nextProps, this.props)) {
          this.selector.run(nextProps);
        }
      }

      public shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      }

      public componentWillUnmount() {
        if (this.subscription) {
          this.subscription.tryUnsubscribe();
        }
        this.subscription = undefined as any;
        this.store = undefined as any;
        this.parentSub = undefined as any;
        this.selector.run = () => ({});
      }

      private initSelector() {
        // const {getState, dispatch} = this.store;
        // const sourceSelector = (state: TPWState, props: TOwnProps) => {
        //   return Object.keys(connectors).map(s => connectors[s].select(state, props));
        // };
        this.selector = createSelector<TOwnProps>(connectors, this.store, this.props);
      }

      private initSubscription() {
        if (shouldHandleStateChanges) {
          const subscription = this.subscription = new Subscription(this.store, this.parentSub);
          const notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
          const dummyState = {};

          subscription.setOnStateChange(() => {
            this.selector.run(this.props);

            if (this.selector.shouldComponentUpdate) {
              this.setState(dummyState, notifyNestedSubs);
            } else {
              notifyNestedSubs();
            }
          });
        }
      }

      public render() {
        const selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return <WrappedComponent {...this.props} {...this.selector.props} />;
        }
      }
    }

    Connect.contextTypes = {
      [storeKey]: storeShape.isRequired,
      [subscriptionKey]: PropTypes.instanceOf(Subscription),
    };
    Connect.childContextTypes = {
      [subscriptionKey]: PropTypes.instanceOf(Subscription).isRequired,
    };

    if (process.env.NODE_ENV !== 'production') {
      // tslint:disable-next-line
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          if (this.subscription) {
            this.subscription.tryUnsubscribe();
          }

          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
          }
        }
      };
    }

    return Connect;
  };
}
