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
        this.state = { key: '/auth/signin' };
    }
    componentWillMount() {
        this.setState(state => {
            return {key: window.location.pathname}
        })
    }
    render() {
        // const { match, location, history } = this.props;
        // console.log(location);
        this.props.history.listen((location, action) => {
            console.log("on route change");
            console.log(location.pathname);
            this.setState({
                key: location.pathname
            });
          })
        return(
            <Tabs {...this.props} activeKey={this.state.key} style={{width: "500px"}} defaultActiveKey={this.state.key} centered={true}>
                <TabPane 
                    tab={
                        <Link to="/auth/signin">
                            <span>
                                <LoginOutlined />
                                Вход
                            </span>
                        </Link>
                    } key="/auth/signin"
                >
                    <Signin />
                </TabPane>
                <TabPane
                    tab={
                        <Link to="/auth/signup">
                            <span>
                                <UserAddOutlined />
                                Регистрация
                            </span>
                        </Link>
                    } key="/auth/signup"
                >
                    <Signup />
                </TabPane>
            </Tabs>
        );
    }
}