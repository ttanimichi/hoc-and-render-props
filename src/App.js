import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: { todos: ['foo', 'bar', 'piyo'] }
    }
  }

  getChildContext() {
    return { getState: () => this.state };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  getState: PropTypes.func.isRequired
};

function TodoComponent({ todos }) {
  return <ul>{todos.map((v) => <li key={v}>{v}</li>)}</ul>;
}

function connect(mapStateToProps) {
  return (WrappedComponent) => {
    const enhancedComponent = (_, {getState}) => {
      const propsFromState = mapStateToProps(getState());
      return <WrappedComponent {...propsFromState} />;
    };

    enhancedComponent.contextTypes = {
      getState: PropTypes.func.isRequired,
    };

    return enhancedComponent;
  }
}

function mapStateToProps(state) {
  return state.todoList;
}

const TodoContainer = connect(mapStateToProps)(TodoComponent);

export default function App() {
  return (
    <Provider>
      <h1>Todo</h1>
      <TodoContainer />
    </Provider>
  );
}
