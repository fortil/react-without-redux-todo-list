import React, { PureComponent } from "react";
import { Skeleton, Row, Col, Icon, Button, Badge, Input, Table } from "antd";

import { COLUMNS, buttons } from "./columns";
import "./todo.css";

class ToDo extends PureComponent {
  state = {
    newTask: "",
    data: []
  };

  addNewTask = () => {
    const { data, newTask } = this.state;
    this.setState({
      data: [...data, { description: newTask, state: "ToDo" }],
      newTask: ""
    });
  };

  onChange = ({ target }) => {
    this.setState({ newTask: target.value });
  };

  setStateTask = (desc, state) => {
    let { data } = this.state;
    data = data.map(({ description, ...rest }) =>
      description === desc ? { description, state } : { ...rest, description }
    );
    this.setState({ data: [...data] });
  };

  renderActions = ({ state, description }) => {
    switch (state) {
      case "ToDo":
        return (
          <a
            href="javascript:;"
            onClick={() => this.setStateTask(description, "Done")}
          >
            Done
          </a>
        );
      default:
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
    const { data, newTask } = this.state;
    const {} = this.props;
    const { addNewTask, onChange, renderActions } = this;
    const dataSource = data;

    return (
      <Row type="flex" justify="center">
        <Skeleton loading={false} active>
          <React.Fragment>
            <Col span={21} className="todo">
              <Col className="col">
                <Input
                  placeholder="Add a new task"
                  onPressEnter={addNewTask}
                  onChange={onChange}
                  value={newTask}
                />
              </Col>
              {buttons.map(({ name }) => (
                <Col key={name} span={8}>
                  <Button block>{name}</Button>
                </Col>
              ))}
              <Col className="col">
                <Table
                  rowKey="description"
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
