import React from 'react';
import MenuPage from './MenuPage';
import { Layout } from 'antd';
import { Switch, Route } from "react-router-dom";
import NavBar from '../layouts/NavBar';
import SideBar from '../layouts/SideBar';
import { PrivateRoute } from '../components';

const { Header, Footer, Sider, Content } = Layout;

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        collapsed: false,
        listmenu: [],
    };
    componentDidMount() {

    }

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
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar />
                <Layout>
                    <Header className='header-custom'>
                        <NavBar />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Switch>
                            <PrivateRoute path="/menu" component={MenuPage} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2022
                    </Footer>
                </Layout>

            </Layout>
        );
    }
}

export default HomePage;