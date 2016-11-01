import * as React from 'react';

import {store} from './store';

//import Provider from './Provider';
import {Provider} from 'react-redux';
import App from './App';

class Root extends React.Component<null, null> {
  render() {
    return <Provider store={store}><App/></Provider>;
  }
}

export default Root;

