import {createElement, Component} from 'react';
import _ from 'lodash';

import * as renders from './connectRenders';

// return React.createElement('div', {}, 'text222' as React.ReactNode);


/*
export function connect<P, S>(props?: any) {
  function wrapWithConnect(WrappedComponent: React.Component<P, S>): React.Component<P, S> {
    class Connector extends React.Component<P, S> {
      render() {
      }
    }

    return Connector;
  }

  return wrapWithConnect;
}
*/


type State = {
  render: false | string,
};

type ConnectSettings = {

};

export function connect(settings: ConnectSettings) {
  return function() {
      class ConCom extends Component<null, State> {

        public render() {
          if (this.state.render) {
            return renders[this.state.render]();
          }

          return createElement('div', {qwe: this.state.render});
        }
        private renderError() {

        }
      }
      return ConCom;
    };
}
