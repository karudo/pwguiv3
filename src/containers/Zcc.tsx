import * as React from 'react';
import {connect} from './connect';

@connect({})
class ZccCom extends React.Component<{}, {}> {
  render() {
    return <div>ZccCom!</div>;
  }
}

export default ZccCom;
