import React from 'react';
import Menu         from './containers/Menu/index';
import { Route, Switch, Link } from 'react-router-dom';
import AuthForm from './containers/Auth/index';
import OfferFeed from './components/OfferFeed/index';
// import Header from './components/Header/index';
import './App.css';
import { Button, Collapse } from 'antd';
import Offer from './components/Card/Offer/index';

import { Layout, Breadcrumb, Input } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, CaretRightOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Panel } = Collapse;

const App = () => {
  return (
    <Switch>
      {/* <OfferFeed /> */}
      <Route exact path='/'>
        <Layout>
          <Header className="header">
            <Link to="/">
              <div className="logo" style={{position: "absolute", width: "10%", height: "100%", textAlign: "center", fontSize: "30px", color: "white", left: "585px"}}>B2B Marketplace</div>
            </Link>
            <div style={{right: "600px", position: "absolute"}}>
              <Link to="auth/signin">
                <Button style={{marginRight: "15px"}} >Войти</Button>
              </Link>
              <Link to="auth/signup">
                <Button type="primary">Зарегистрироваться</Button>
              </Link>
            </div>
          </Header>
          <Content style={{ padding: '0 600px' }}>
            {/* НАВИГАЦИЯ */}
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Layout className="site-layout-background" style={{ padding: '0 0' }}>
              <Sider style={{height: '100vh', width: "256px", padding: "20px 0"}} width={256} className="site-layout-background">
                <Menu mode="inline" style={{ height: '100%' }}></Menu>
              </Sider>
              <Content style={{ padding: '0px 20px', minHeight: 280 }}>
                {/* ФИЛЬТР */}
                {/* <Collapse bordered={false}
                  defaultActiveKey={['1']}
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  className="site-collapse-custom-collapse"
                  bordered={true}
                  style={{width: "1050px"}}
                >
                  <Panel header="Фильтр" key="1">
                    <p>filter</p>
                  </Panel>
                </Collapse> */}
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
      <Route exact path='/auth/*'>
        <Layout>
          <Header className="header">
            <Link to="/">
              <div className="logo" style={{position: "absolute", width: "10%", height: "100%", textAlign: "center", fontSize: "30px", color: "white", left: "585px"}}>B2B Marketplace</div>
            </Link>
          </Header>
          <Content style={{ padding: '0 600px' }}>
            <Layout className="site-layout-background" style={{ padding: '24px 0', height: '90vh', position: "relative", marginLeft: "0", alignItems: "center", verticalAlign: "center" }}>
              <Content style={{position: "absolute", top: "50%", transform: "translateY(-100%)"}}>
                <Route exact path='*/signin' component={AuthForm}/>
                <Route exact path='*/signup' component={AuthForm}/>
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




// border: 1px solid #f0f0f0;
// box-shadow: 10px 5px 5px #e1dddd;
// color: rgba(0, 0, 0, 0.65);