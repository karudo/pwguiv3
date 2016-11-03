import * as React from 'react';
import Qwe from './qwe';

import Zcc from './Zcc';

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
    return (
      <div>
        <button onClick={this.handleButtonClick}>&gt;&gt; ok &lt;&lt;</button>
        hello!!!!
        <Qwe num={this.state.num} />
        <Zcc type={this.state.num}/>
      </div>
    );
  }
}

export default App;
