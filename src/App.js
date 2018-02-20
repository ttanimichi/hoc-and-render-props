import React, { Component } from 'react';

function CounterComponent({ value, handleClick }) {
  return (
    <div>
      <div>count: {value}</div>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}

function higherOrderComponent(CounterComponent) {
  return class extends Component {
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
      return <CounterComponent value={this.state.value} handleClick={this.handleClick} />;
    }
  }
}

const CounterContainer = higherOrderComponent(CounterComponent);

export default function App() {
  return (
    <div>
      <h1>Counter</h1>
      <CounterContainer />
    </div>
  );
}
