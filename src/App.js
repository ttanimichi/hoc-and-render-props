import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { value: 0 };
  }

  handleClick() {
    this.setState(({ value }) => {
      return { value: value + 1 };
    });
  }

  render() {
    return (
      <div>
        <div>count: {this.state.value}</div>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}

export default function App() {
  return (
    <div>
      <h1>Counter</h1>
      <Counter />
    </div>
  );
}
