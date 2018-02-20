import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: { value: 0 }
    }
  }

  getChildContext() {
    return {
      getState: () => this.state,
      dispatch: (func) => { this.setState(func) }
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  getState: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function CounterComponent({ value, handleClick }) {
  return (
    <div>
      <div>count: {value}</div>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}

function connect(mapStateToProps, mapDispatchToProps) {
  return (WrappedComponent) => {
    const enhancedComponent = class extends Component {
      render() {
        const propsFromState = mapStateToProps(this.context.getState());
        const handleClick = () => { this.context.dispatch(mapDispatchToProps.handleClick) };

        return <WrappedComponent {...propsFromState} handleClick={handleClick} />;
      }
    };

    enhancedComponent.contextTypes = {
      getState: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    };

    return enhancedComponent;
  }
}

function mapStateToProps(state) {
  return state.counter;
}

const mapDispatchToProps = {
  handleClick: (prevState) => { return { value: prevState.value + 1 } }
};

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(CounterComponent);

function App() {
  return (
    <Provider>
      <h1>Counter</h1>
      <CounterContainer />
    </Provider>
  );
}

export default App;
