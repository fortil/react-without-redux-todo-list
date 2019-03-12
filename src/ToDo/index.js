import React, { PureComponent } from "react";
import { Skeleton, Row, Col, Button, Input, Table } from "antd";

import { COLUMNS, buttons } from "./columns";
import "./todo.css";

const todoList = "todoList";

class ToDo extends PureComponent {
  componentDidMount() {
    let data = localStorage.getItem(todoList);
    data = JSON.parse(data || "[]");
    if (data.length) {
      this.setState({ data });
    }
  }
  state = {
    newTask: "",
    show: "All",
    data: []
  };

  addNewTask = () => {
    const { data, newTask } = this.state;
    const newData = {
      data: [...data, { description: newTask, state: "ToDo" }],
      newTask: ""
    };
    localStorage.setItem(todoList, JSON.stringify(newData.data));
    this.setState(newData);
  };

  setStateTask = (desc, state) => {
    let { data } = this.state;
    data = data.map(({ description, ...rest }) =>
      description === desc
        ? { ...rest, description, state }
        : { ...rest, description }
    );
    this.setState({ data: [...data] });
  };

  renderActions = ({ state, description }) => {
    if (state === "ToDo") {
      return (
        <a
          href="javascript:;"
          onClick={() => this.setStateTask(description, "Done")}
        >
          Done
        </a>
      );
    } else {
      return (
        <a
          href="javascript:;"
          onClick={() => this.setStateTask(description, "ToDo")}
        >
          To do
        </a>
      );
    }
  };

  render() {
    const { data, newTask, show } = this.state;
    const { addNewTask, renderActions } = this;
    const dataSource = data.filter(
      ({ state }) => show === "All" || state === show
    );

    return (
      <Row type="flex" justify="center">
        <Skeleton loading={false} active>
          <React.Fragment>
            <Col span={21} className="todo">
              <Col className="col">
                <Input
                  placeholder="Add a new task"
                  onPressEnter={addNewTask}
                  onChange={({ target }) =>
                    this.setState({ newTask: target.value })
                  }
                  value={newTask}
                />
              </Col>
              <Row>
                {buttons.map(({ name }) => (
                  <Col key={name} span={8}>
                    <Button
                      block
                      type={name === show ? "primary" : "secondary"}
                      onClick={() => this.setState({ show: name })}
                    >
                      {name}
                    </Button>
                  </Col>
                ))}
              </Row>
              <Col className="col">
                <Table
                  rowKey="description"
                  bordered
                  pagination={false}
                  dataSource={dataSource}
                  columns={COLUMNS.concat([
                    {
                      title: "Action",
                      dataIndex: "",
                      key: "x",
                      render: renderActions
                    }
                  ])}
                />
              </Col>
            </Col>
          </React.Fragment>
        </Skeleton>
      </Row>
    );
  }
}

export default ToDo;
