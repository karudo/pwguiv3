import * as React from 'react';
import Qwe from './qwe';

// import {createStore, applyMiddleware, combineReducers} from 'redux';

import {connect} from './connect';

const Zcc = connect();

class App extends React.Component<{}, {num: number}> {
  constructor(...args: any[]) {
    super(...args);
    this.state = {
      num: 0,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  private handleButtonClick() {
    this.setState({num: this.state.num + 1});
  }

  public render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>&gt;&gt; ok &lt;&lt;</button>
        hello!!!!
        <Qwe num={this.state.num} />
        <Zcc/>
      </div>
    );
  }
}

export default App;
