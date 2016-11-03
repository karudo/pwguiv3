import * as React from 'react';
import {connect, Connector} from './connect';
// import {mapValues} from 'lodash';

type ParentProps = {
  type: number
};

type CurrentProps = {
  qwe: string
};

class ZccCom extends React.Component<ParentProps & CurrentProps, {}> {
  render() {
    return <div>ZccCom! {this.props.type}</div>;
  }
}

export default connect<ParentProps>({
  hui: new Connector(4),
})(ZccCom);
