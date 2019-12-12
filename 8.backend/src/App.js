import React, { Component } from 'react';
import './App.css';
import Todo from "./component/todo";


class App extends Component {
  render() {
    return (
      <div className="container my-5">
        <Todo/>
      </div>
    );
  }
}

export default App;
