import React, { Component } from "react";
import { Input } from "antd";

class InputComponent extends Component {
  state = {
    newTask: ''
  }

  render() {
    const { newTask } = this.state;
    const { click } = this.props;

    return (
      <Input
        placeholder="Add a new task"
        onPressEnter={() => click(newTask)}
        onChange={({ target }) => this.setState({ newTask: target.value })}
        value={newTask}
      />
    )
  }
}

export default InputComponent;