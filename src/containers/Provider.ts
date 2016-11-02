import {Component, PropTypes, Children, ReactNode} from 'react';

import storeShape from './storeShape';

class Provider extends Component<{store: any}, null> {
  public static propTypes;
  public static childContextTypes;
  public static displayName: string;
  public componentWillReceiveProps: any;
  public getChildContext() {
    return {
      store: this.props.store,
    };
  }
  public render() {
    return Children.only(this.props.children as ReactNode);
  }
}

declare const process: any;

if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line
  Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    const {store} = this;
    const {store: nextStore} = nextProps;

    if (store !== nextStore) {
      console.log('warn');
    }
  };
}

Provider.propTypes = {
  store: storeShape,
  children: PropTypes.element.isRequired,
};
Provider.childContextTypes = {
  store: storeShape,
};
Provider.displayName = 'Provider';

export default Provider;
