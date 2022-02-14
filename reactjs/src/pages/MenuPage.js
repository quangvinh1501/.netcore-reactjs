import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { createMenu, getMenu, updateMenu, deleteMenu } from '../actions/menu.action';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography, message, Table, Form, Modal, Button, Row, Col, Select, Input } from 'antd';
import { authHeader } from '../helpers';

const { Title } = Typography;
const { Option } = Select;
class MenuPage extends React.Component {
  dispatch = {};
  constructor(props) {
    super(props)
    this.dispatch = props.dispatch;
    this.state = ({
      statestatus: [],
      visibleModalMenu: false,
      titleform: null,
      actions: null,
      visiblestatus: false,
      visibledelete: false,
      id: null,
      formData: {
        id: null,
        active: null,
        icon: null,
        name: null,
        target: null,
        link: null,
        position: null,
      }
    })
  }
  getStatus = async () => {
    await fetch(process.env.REACT_APP_API_URI + "Actives/GetActives", {
      method: 'GET',
      headers: authHeader()
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ statestatus: result });
      },
        (error) => {
          alert('Failed');
        });
  }
  showModalMenu = (record) => {
    this.setState({ visibleModalMenu: true });
    if (record != null) {
      this.setState({ titleform: 'Edit Menu', actions: 'edit', id: record.id });
      this.setState({
        formData: {
          id: record.id,
          name: record.name,
          active: record.active,
          icon: record.icon,
          position: record.position,
          link: record.link,
          target: record.target,
        }
      })

    } else {
      this.setState({
        formData: {
          id: null,
          name: null,
          active: null,
          icon: null,
          position: null,
          link: null,
          target: null,
        }
      })
      this.setState({ titleform: 'Add Menu', actions: 'add' });
    }
    this.getStatus();
  };
  hideModalMenu = () => {
    this.setState({ visibleModalMenu: false });
  };

  showModalStatusShow = () => {
    this.setState({ visiblestatus: true })
  };

  hideModalStatusHide = () => {
    this.setState({ visiblestatus: false })
  };

  showModalDelete = (id) => {
    this.setState({ visibledelete: true, id: id })
  };

  hideModalDelete = () => {
    this.setState({ visibledelete: false })
  };

  menuHandleSubmit = async (values) => {
    if (this.state.actions === "add") {
      this.dispatch(createMenu(values));
      this.hideModalMenu();
      message.success('Inserted successfully');
    } else {
      this.dispatch(updateMenu({ ...values, ...{ id: this.state.id } }));
      this.hideModalMenu();
       message.success('Updated successfully');
    }
    //else
  }

  confirmStatus = async (active, id) => {
    this.setState({ id: id, active: active });
    this.showModalStatusShow();
  }

  confirmDelete = (id) => {
    this.showModalDelete(id);
  }
  deleteRow = async () => {
    this.dispatch(deleteMenu(this.state.id));
    this.hideModalDelete();
    message.success('Deleted successfully');
  };

  render() {
    const { titleform, visibleModalMenu, visibledelete } = this.state;
    const datatableall = this.props.menus;
    return (
      <Row>
        <Col span={24}>
          <div style={{ float: 'left' }}><Title level={3}>Menu Management (Add, Update, Delete)</Title></div><div style={{ float: 'right' }}><Button className="btn-success-costom" onClick={() => this.showModalMenu()}>Add</Button></div>
        </Col>
        <Col span={24}>
          <Table
            className="table-striped-datatableall"
            //columns={columns}
            columns={
              [
                {
                  title: "Actions",
                  responsive: ["sm"],
                  dataIndex: "",
                  render: (datatableall, record) => (
                    //datatableall.map((datatableall) => 
                    <div><Button type="primary" style={{ marginRight: '5px' }} onClick={() => this.confirmStatus(record.active, record.id)}>{record.active === 'yes' ? <EyeOutlined /> : <EyeInvisibleOutlined />}</Button>
                      <Button style={{ marginRight: '5px' }} className="edit-btn-custom" onClick={() => this.showModalMenu(record)}>Edit</Button>
                      <Button type="danger" onClick={() => this.confirmDelete(record.id)}>Delete</Button></div>
                    //  )
                  )
                },
                {
                  title: "Name",
                  dataIndex: "name",
                  sorter: true,
                  responsive: ["xs"]
                },
                {
                  title: "Link",
                  dataIndex: "link",
                  responsive: ["sm"]
                },
                {
                  title: "Target",
                  dataIndex: "target",
                  responsive: ["sm"]
                },
                {
                  title: "Position",
                  dataIndex: "position",
                  responsive: ["sm"]
                },
                
              ]
            }
            dataSource={datatableall}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            scroll={{ x: 1500, y: 500 }}
            bordered={true}
          >
          </Table>
        </Col>
        <Modal
          title={titleform}
          visible={visibleModalMenu}
          onCancel={this.hideModalMenu}
          destroyOnClose={true}
          footer={null}
        >
          <div>
            <Form
              layout="horizontal"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={this.state.formData}
              onFinish={this.menuHandleSubmit}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input name of menu!',
                  },
                ]}
              >
                <Input placeholder="input name" />
              </Form.Item>
              <Form.Item
                label="Link"
                name="link"
                rules={[
                  {
                    required: true,
                    message: 'Please input link of menu!',
                  },
                ]}
              >
                <Input placeholder="input link" />
              </Form.Item>
              <Form.Item
                label="Target"
                name="target"
                rules={[
                  {
                    required: true,
                    message: 'Please input target of menu!',
                  },
                ]}
              >
                <Input placeholder="input target" />
              </Form.Item>
              <Form.Item
                label="Position"
                name="position"
                rules={[
                  {
                    required: true,
                    message: 'Please input position of menu!',
                  },
                ]}
              >
                <Input placeholder="input position" />
              </Form.Item>
              <Form.Item
                label="Icon"
                name="icon"
                rules={[
                  {
                    required: true,
                    message: 'Please input icon of menu!',
                  },
                ]}
              >
                <Input placeholder="input icon" />
              </Form.Item>
              <Form.Item
                label="Status"
                name="active"
                rules={[
                  {
                    required: true,
                    message: 'Please choose a status of menu!',
                  },
                ]}
              >
                <Select size="default"
                  placeholder="Select a status"
                >
                  {this.state.statestatus.map(statuslist =>
                    <Option key={statuslist.name}>{statuslist.name}</Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal
          title="Confirm"
          visible={visibledelete}
          onOk={this.deleteRow}
          onCancel={this.hideModalDelete}
          okText="Yes"
          cancelText="No"
        >
          <p><ExclamationCircleOutlined /> Are you sure to delete it?</p>
        </Modal>
      </Row>

    );
  }
}

const mapPropsToState = (state) => {
  return { menus: state.menus }
}

export default connect(mapPropsToState)(MenuPage);