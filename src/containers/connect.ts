import {createElement, Component, PropTypes} from 'react';
//import _ from 'lodash';

import {Store} from 'redux';

import storeShape from './storeShape';

import * as renders from './connectRenders';

import Subscription from './Subscription'

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

export function connect(settings: ConnectSettings) {
  const {
    storeKey = 'store',
    shouldHandleStateChanges = true,
  } = settings;

  const subscriptionKey = storeKey + 'Subscription';
  const version = hotReloadingVersion++;

  const contextTypes = {
    [storeKey]: storeShape.isRequired,
    [subscriptionKey]: PropTypes.instanceOf(Subscription)
  };

  const childContextTypes = {
    [subscriptionKey]: PropTypes.instanceOf(Subscription)
  };

  return function wrapWithConnect(WrappedComponent) {
    class Connect extends Component<{}, ConnectState> {
      static contextTypes;
      static childContextTypes;

      private selector: TypeSelector;
      private version: number;
      private renderCount: number = 0;
      private store: PWStore;

      private subscription: Subscription;
      private parentSub: Subscription;

      constructor(props, context) {
        super(props, context);
        this.version = version;
        this.state = {
          render: false
        };
        this.store = this.context[storeKey];
        this.parentSub = this.context[subscriptionKey];

        this.initSelector();
        this.initSubscription();
      }

      private componentDidMount() {
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate()
      }

      private componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      }

      private initSelector() {
        const {getState, dispatch} = this.store;
        const sourceSelector = (state: PWState, props: {}) => ({});
        this.selector = createSelector(sourceSelector, getState, this.props);
      }

      private initSubscription() {
        if (shouldHandleStateChanges) {
          const subscription = this.subscription = new Subscription(this.store, this.parentSub);
          const notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
          const dummyState = {} as ConnectState;

          subscription.setOnStateChange(() => {
            this.selector.run(this.props);

            if (!this.selector.shouldComponentUpdate) {
              subscription.notifyNestedSubs();
            } else {
              this.setState(dummyState, notifyNestedSubs);
            }
          });
        }
      }

      public render() {
        if (this.state.render) {
          return renders[this.state.render]();
        }

        return createElement(WrappedComponent, {qwe: this.state.render});
      }
    }

    Connect.contextTypes = contextTypes;
    Connect.childContextTypes = childContextTypes;
    return Connect;
  };
}
