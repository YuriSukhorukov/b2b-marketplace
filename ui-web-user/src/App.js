import React, { useState } from 'react';
import Menu         from './containers/Menu/index';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import authStore from './stores/authStore';
import AuthForm from './containers/Auth/index';
import OfferFeed from './components/OfferFeed';
import OfferCreate from './components/OfferCreate';
// import Header from './components/Header/index';
import { observer } from 'mobx-react';
import './App.css';
import { Button, Collapse } from 'antd';
import Offer from './components/Card/Offer/index';
import axios from 'axios';
import { Layout, Breadcrumb, Input } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, CaretRightOutlined } from '@ant-design/icons';
import auth from './api/auth';
import signin from './api/auth/signin';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Panel } = Collapse;

const DebugAPI = () => {
  const request = ({url, method, body, headers}) => {
    return new Promise((res, rej) => {
      axios({
        url,
        method,
        body,
        headers
      }).then(response => {
        console.log(response);
        res(response);
      }).catch((error) => {
        console.log(error);
        res(error);
      });;
    });
  }
  return(
    <>
      <Button type="primary" style={{margin: "10px"}} onClick={()=>{request({url: '/', method: 'POST'})}}>POST URL: "/"</Button>
      <Button type="primary" style={{margin: "10px"}} onClick={()=>{request({url: '/', method: 'GET'})}}>GET URL: "/"</Button>
      <Button type="primary" style={{margin: "10px"}} onClick={()=>{request({url: '/api/v1/jwt', method: 'POST'})}}>POST URL: "/api/v1/jwt"</Button>
      <Button type="primary" style={{margin: "10px"}} onClick={()=>{request({url: '/api/v1/auth/signin', method: 'POST', body: {}, headers: {username: 'yuri@gmail.com', password: 'sdWE343sx!'}})}}>POST URL: "/api/v1/auth/signin"</Button>
      <Button type="primary" style={{margin: "10px"}} onClick={()=>{request({url: '/api/v1/auth/signout', method: 'POST'})}}>POST URL: "/api/v1/auth/signout"</Button>
    </>
  );
}

const App = observer(() => {
  return (
    <Switch>
      <Route path="/debug" component={DebugAPI} />
      <Layout>
        <Header className="header">
          <Link to="/">
            <div className="logo" style={{position: "absolute", width: "10%", height: "100%", textAlign: "center", fontSize: "30px", color: "white", left: "535px"}}>Tetra LTD</div>
          </Link>
          {
            !authStore.isAuthenticated 
            &&
              (
                <div style={{right: "600px", position: "absolute"}}>
                  <Link to="/auth/signin">
                    <Button style={{marginRight: "15px"}} >Войти</Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button type="primary">Зарегистрироваться</Button>
                  </Link>
                </div>
              )
          }
        </Header>
        <Content style={{ padding: '0 600px' }}>
          <Layout className="site-layout-background" style={{ padding: '0 0', minHeight: '90vh' }}>
            {
              authStore.isAuthenticated 
              ?
                (
                  <div>
                    <Sider style={{height: '100%', width: "256px", padding: "20px 0"}} width={256} className="site-layout-background">
                      <Menu mode="inline" style={{ height: '100%' }}></Menu>
                    </Sider>
                  </div>
                ) 
              : 
                <Redirect to="/auth/signin"></Redirect>
            }
            {/* Регистрация || Список предложений || Либо... */}
            <Content style={{ padding: '0px 20px', minHeight: 280 }}>
              <Route path="/auth/*" render={(props) => {
                return (
                  authStore.isAuthenticated ? <Redirect to='/'></Redirect> :
                  <div style={{position: "absolute", top: "50%", left: '50%', transform: "translateY(-100%) translateX(-50%)"}}>
                    <AuthForm {...props}/>
                  </div>
                )
              }}></Route>
              <Route path="/offers/search" component={OfferFeed} />
              <Route path="/offers/new" component={OfferCreate} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>B2B Marketplace ©2020 Created by SPB-Tech</Footer>
      </Layout>

      {/* <Route exact path='/'>
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
            <Layout className="site-layout-background" style={{ padding: '0 0' }}>
              <Sider style={{height: '100vh', width: "256px", padding: "20px 0"}} width={256} className="site-layout-background">
                <Menu mode="inline" style={{ height: '100%' }}></Menu>
              </Sider>
              <Content style={{ padding: '0px 20px', minHeight: 280 }}>
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
      </Route> */}
    </Switch>
  );
})

export default App;




// border: 1px solid #f0f0f0;
// box-shadow: 10px 5px 5px #e1dddd;
// color: rgba(0, 0, 0, 0.65);