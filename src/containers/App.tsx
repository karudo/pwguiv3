import * as React from 'react';
import Qwe from './qwe';

import Zcc from './Zcc';

import {connect} from 'react-redux';

type TypeTest = {
  ourHueur: number
}

const s = {
  zxc: 1,
};

type TypeHuipe = typeof s;

class Test extends React.Component<TypeTest & TypeHuipe, {}> {
  render() {
    //this.props.zxc.toFixed
    const a = this.props.ourHueur;
    return <div onClick={() => a}/>;
  }
}

const fun = (state: any): TypeHuipe => {
  return {
    zxc: state.x,
  };
};

const ConnTest = connect<TypeHuipe, {}, TypeTest>(fun)(Test);

class App extends React.Component<{}, {num: number}> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      num: 0,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  private handleButtonClick() {
    this.setState({num: this.state.num + 1});
  }

  public render() {
    const {num} = this.state;
    return (
      <div>
        <button onClick={this.handleButtonClick}>&gt;&gt; ok &lt;&lt;</button>
        hello!!!!
        <Qwe num={num} />
        <Zcc type={num}/>
        <ConnTest ourHueur={11} />
      </div>
    );
  }
}

export default App;
