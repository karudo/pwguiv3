import * as React from 'react';
const {Component, PropTypes} = React;
import _ from 'lodash';

import {Store} from 'redux';

import storeShape from './storeShape';

// import * as renders from './connectRenders';

import Subscription from './Subscription';

import {createSelector, TypeSelector} from './createSelector';

type PWState = {};

type PWStore = Store<PWState>;

type ConnectState = {
  render: false | string,
};

type ConnectSettings = {
  storeKey?: string,
  shouldHandleStateChanges?: boolean
};

let hotReloadingVersion = 0;

export class Connector {
  constructor(public s: number) {

  }
}

type ConnectorsObject = {
  [key: string]: Connector
};

export function connect<ParentProps>(connectors: ConnectorsObject, settings: ConnectSettings = {}) {
  const {
    storeKey = 'store',
    shouldHandleStateChanges = true,
  } = settings;

  const subscriptionKey = `${storeKey}Subscription`;
  const version = hotReloadingVersion++;

  // tslint:disable-next-line:only-arrow-functions
  return function wrapWithConnect(WrappedComponent: any) {
    class Connect extends Component<ParentProps, ConnectState> {
      static contextTypes: any;
      static childContextTypes: any;

      private selector: TypeSelector;
      private version: number;
      // private renderCount: number = 0;
      private store: PWStore;

      private subscription: Subscription;
      private parentSub?: Subscription;

      public context: {
        [index: string]: any
      };

      constructor(props: ParentProps, context: {}) {
        super(props, context);
        this.version = version;
        this.state = {
          render: false,
        };
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
        if (this.selector.shouldComponentUpdate) {
          this.forceUpdate();
        }
      }

      public componentWillReceiveProps(nextProps: ParentProps) {
        this.selector.run(nextProps);
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
        const {getState, dispatch} = this.store;
        const sourceSelector = (state: PWState, props: {}) => ({});
        this.selector = createSelector(sourceSelector, getState, this.props);
      }

      private initSubscription() {
        if (shouldHandleStateChanges) {
          const subscription = this.subscription = new Subscription(this.store, this.parentSub);
          const dummyState = {} as ConnectState;

          subscription.setOnStateChange(() => {
            this.selector.run(this.props);

            if (!this.selector.shouldComponentUpdate) {
              subscription.notifyNestedSubs();
            } else {
              this.setState(dummyState, () => subscription.notifyNestedSubs());
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
          return <WrappedComponent ddd={1} />;
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
