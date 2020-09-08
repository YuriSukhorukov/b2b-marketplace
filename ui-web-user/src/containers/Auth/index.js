import React from 'react';
import Signup from '../../forms/Signup/index';
import Signin from '../../forms/Signin/index';
import { Tabs } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
// import './style.css';
import { BrowserRouter, Route, Redirect, Switch, Link, useHistory } from "react-router-dom";

// let history = useHistory();

const { TabPane } = Tabs;
export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { key: 'signin' };
    }
    componentWillMount() {
        this.setState(state => {
            return {key: window.location.pathname}
        })
    }
    render() {
        // const { match, location, history } = this.props;
        // console.log(location);
        return(
            // this.props.history.push(key)
            <Tabs style={{width: "500px"}} defaultActiveKey={this.state.key} onChange={this.props.history.push} centered={true}>
                <TabPane 
                    tab={
                        <span>
                            <LoginOutlined />
                            Вход
                        </span>
                    } key="/auth/signin"
                >
                    <Signin />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <UserAddOutlined />
                            Регистрация
                        </span>
                    } key="/auth/signup"
                >
                    <Signup />
                </TabPane>
            </Tabs>
        );
    }
}