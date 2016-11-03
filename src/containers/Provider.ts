import {Component, PropTypes, Children, ReactNode} from 'react';

import storeShape from './storeShape';

class Provider extends Component<{store: any, storeKey?: string}, null> {
  public static defaultProps = {
    storeKey: 'store',
  };

  public static propTypes = {
    store: storeShape.isRequired,
    storeKey: PropTypes.string,
    children: PropTypes.element.isRequired,
  };

  public static childContextTypes = {
    store: storeShape.isRequired,
  };

  public static displayName = 'Provider';

  public componentWillReceiveProps: any;

  public getChildContext() {
    return {
      [this.props.storeKey as string]: this.props.store,
    };
  }

  public render() {
    return Children.only(this.props.children as ReactNode);
  }
}

if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line
  Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps: any) {
    const {store} = this;
    const {store: nextStore} = nextProps;

    if (store !== nextStore) {
      console.log('warn');
    }
  };
}

export default Provider;
