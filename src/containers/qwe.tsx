import * as React from 'react'

function connect(pr: {}) {
  return function (z: React.Component) {

  };
}

class Zxc extends React.Component<{}, {}> {
  render() {
    return <div>q</div>;
  }
}

let z = connect({})(Zxc);

class Qwe extends React.Component<{num: number}, null> {
  render() {
    return (
      <div>
        {this.props.num}
      </div>
    );
  }
}

export default Qwe;
