import * as React from 'react'

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
