import React, { PureComponent } from "react";
import { Skeleton, Row, Col, Table } from "antd";

import Input from "../components/Input";
import Buttons from "../components/Buttons";
import { COLUMNS, buttons } from "./columns";
import "./todo.css";

const todoList = "todoList";

class ToDo extends PureComponent {
  state = {
    show: "All",
    data: []
  };

  componentDidMount() {
    let data = localStorage.getItem(todoList);
    data = JSON.parse(data || "[]");
    if (data.length) {
      this.setState({ data });
    }
  }

  addNewTask = newTask => {
    const { data } = this.state;
    const newData = {
      data: [...data, { description: newTask, state: "ToDo" }]
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
    localStorage.setItem(todoList, JSON.stringify(data));
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
    const { data, show } = this.state;
    const { addNewTask, renderActions } = this;
    const dataSource = data.filter(
      ({ state }) => show === "All" || state === show
    );

    return (
      <Row type="flex" justify="center">
        <Skeleton loading={false} active>
          <Col span={21} className="todo">
            <Col className="col">
              <Input click={addNewTask} />
            </Col>
            <Row>
              <Buttons
                show={show => this.setState({ show })}
                buttons={buttons}
              />
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
        </Skeleton>
      </Row>
    );
  }
}

export default ToDo;
