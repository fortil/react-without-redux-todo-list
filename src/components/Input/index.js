import React, { useState } from "react";
import { Input } from "antd";

export default function InputComponent({ click }) {
  const [newTask, addNewTask] = useState("");

  return (
    <Input
      placeholder="Add a new task"
      onPressEnter={() => click(newTask)}
      onChange={({ target }) => addNewTask(target.value)}
      value={newTask}
    />
  );
}
