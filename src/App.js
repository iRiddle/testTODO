import React, { Component } from "react";
import List from "./components/List";
import Form from "./components/Form";

class App extends Component {
  render() {
    const list = this.props.list;
    const visitor = this.props.visitor;
    return (
      <div className="container">
        <h1 align="center" className="pt-4">
          ToDo List
        </h1>
        <Form visitor={visitor} />
        <List list={list} />
      </div>
    );
  }
}

export default App;
