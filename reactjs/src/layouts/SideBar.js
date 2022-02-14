import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { getMenu } from '../actions/menu.action';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
class SideBar extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                <div><img src='../assets/logo/1.png' style={{maxWidth:'170px',margin: '10px 16px 10px 16px',padding: '10px',backgroundColor: "#fff"}}/></div>
                    {this.props.menus?.length ? this.props.menus.map((menuss, index) => {
                        return (
                            <Menu.Item key={index}>
                                <span><i className={menuss.icon} /> {menuss.name}</span>
                                <Link to={menuss.link} />
                            </Menu.Item>
                        )
                    }) : ''
                    }
                </Menu>
            </Sider>
        );
    }
}
const mapPropsToState = (state) => {
    return { menus: state.menus }
}
const mapDispatchToState = (dispatch) => {
    dispatch(getMenu());
    return {};
}
export default connect(mapPropsToState, mapDispatchToState)(SideBar);