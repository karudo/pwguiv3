import * as React from 'react'
import Qwe from './qwe';
//import {createStore, applyMiddleware, combineReducers} from 'redux';

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

class App extends React.Component<null, {num: number}> {
  constructor(...args: any[]) {
    super(...args);
    this.state = {
      num: 0
    };
  }
  render() {
    const num = this.state.num;

    return (
      <div>

        <button onClick={() => this.setState({num: num + 1})}>ok</button>
        hello!!!!
        <Qwe num={num} />
      </div>
    );
  }
}

export default App;
