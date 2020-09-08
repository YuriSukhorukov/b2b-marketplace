import React from 'react';
import Menu         from './containers/Menu/index';
import { Route, Switch, Link } from 'react-router-dom';
import AuthForm from './containers/Auth/index';
// import Header from './components/Header/index';
import './App.css';
import { Button }         from 'antd';
import Offer from './components/Card/Offer/index';


import { Layout, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Layout>
          <Header className="header">
            <Link to="/">
              <div className="logo" style={{position: "absolute", width: "10%", height: "100%", textAlign: "center", fontSize: "30px", color: "white"}}>B2B Marketplace</div>
            </Link>
            <div style={{right: "15px", position: "absolute"}}>
              <Link to="auth">
                <Button style={{marginRight: "15px"}} >Войти</Button>
              </Link>
              <Link to="auth">
                <Button type="primary">Зарегистрироваться</Button>
              </Link>
            </div>
          </Header>
          <Content style={{ padding: '0 550px' }}>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Sider style={{height: '100vh', width: "256px"}} width={256} className="site-layout-background">
                <Menu mode="inline" style={{ height: '100%' }}></Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                Content
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>B2B Marketplace ©2020 Created by SPB-Tech</Footer>
        </Layout>
      </Route>
      <Route exact path='/auth'>
        <Layout>
          <Header className="header">
            <Link to="/">
              <div className="logo" style={{position: "absolute", width: "10%", height: "100%", textAlign: "center", fontSize: "30px", color: "white"}}>B2B Marketplace</div>
            </Link>
          </Header>
          <Content style={{ padding: '0 950px' }}>
            <Layout className="site-layout-background" style={{ padding: '24px 0', height: '90vh', position: "relative", marginLeft: "0", alignItems: "center", verticalAlign: "center" }}>
              <Content style={{position: "absolute", top: "50%", transform: "translateY(-100%)"}}>
                <AuthForm />
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>B2B Marketplace ©2020 Created by SPB-Tech</Footer>
        </Layout>
      </Route>
    </Switch>
  );
}

export default App;