import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { Spin } from 'antd';
import './login.css'

const FormItem = Form.Item;
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      username: '',
      password: '',
      submitted: false
    })
    this.props.dispatch(userActions.logout());
  }

  handleSubmit = (values) => {
    this.setState({ submitted: true });
    this.setState({
      username: values.username,
      password: values.password
    });
    //const { username, password } = this.state;
    const { dispatch } = this.props;
    if (this.state.username && this.state.password) {
        dispatch(userActions.login(values.username, values.password));
    }
  };

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="container">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => this.handleSubmit(values)}
          >
            <FormItem
              initialValue={username}


              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
               // onChange={this.handleChange}
                value={username}
                onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : ''}
                prefix={<UserOutlined
                  className="site-form-item-icon" />}
                placeholder="Username"
              />
            </FormItem>
            <FormItem
              initialValue={password}

              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
               // onChange={this.handleChange}
                value={password}
                onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : ''}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              {loggingIn &&
               <Spin />
              }
            </FormItem>
          </Form>
        </div>
      </div>
    );
  };
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 