import React, { Component } from 'react';

function WrappedComponent(props) {
  return (
    <div>
      <div>{JSON.stringify(props)}</div>
    </div>
  );
}

function higherOrderComponent(WrappedComponent) {
  return (props) => {
    return <WrappedComponent piyo="piyo" {...props} />;
  };
}

export default class App extends Component {
  render() {
    const EnhancedComponent = higherOrderComponent(WrappedComponent);

    return (
      <div className="App">
        <h1>App</h1>
        <EnhancedComponent foo="foo" />
      </div>
    );
  }
}
