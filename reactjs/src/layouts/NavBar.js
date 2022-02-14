import React, { useState } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import { Menu, Dropdown, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { userActions } from '../actions';
import { history } from '../helpers';
import store from '../helpers/store';
import { connect } from 'react-redux';
import { Typography } from 'antd';

const { Title } = Typography;
function handleMenuProfile(e) {
  message.info('Click on Profile.');
}

const NavBar = ({ dispatch })=>{
  const { authentication } = store.getState();
  const { user } = authentication;
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={handleMenuProfile}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleMenuLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  function handleMenuLogout() {
    dispatch(userActions.logout);
    history.push('/login');
  }

  return (
    <>

      <div className='avatar'>
        <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<Avatar style={{ float: 'right' }} src='../assets/avatar/fox.png' />}>
          Hi! {user.userName}
        </Dropdown.Button>
      </div>
      <div><Title level={2}>Menu Management</Title></div>
    </>
  );
}

// export { connectedNavBar as NavBar };
export default connect()(NavBar);