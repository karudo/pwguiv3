import * as React from 'react';

type TProps = {
  num: number
};

type TState = {
  s: string
};

class Qwe extends React.Component<TProps, TState> {

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(nextProps: TProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.setState({
      s: nextProps.num + '.X',
    }, () => console.log('aftersetstate'));
  }

  shouldComponentUpdate(nextProps: TProps , nextState: TState) {
    console.log('shouldComponentUpdate', nextProps, this.state, nextState);
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  public render() {
    console.log('render');
    return (
      <div>
        {this.props.num}
      </div>
    );
  }
}

export default Qwe;
