import * as React from 'react'

function pwconnect(a: any): any {
  return a;
}

function zxc(): any {
  return 1;
}

@pwconnect({
  lenta: zxc()
})
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
