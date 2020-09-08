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
        console.log(props);
        console.log(props.location);
        this.props = props;

        this.state = { key: 'signin' };
        // props.history.push('/auth/signin');
    }
    componentWillMount() {
        this.setState(state => {
            return {key: window.location.pathname}
        })
        // console.log(this.state.key);
        
        // history.push('location')
    }
    // componentDidUpdate(prevProps) {
    //     if (window.location.pathname != this.state.key)
    //         this.props.history.push(this.state.key);
    // //     console.log(prevProps);
        
    // //     // will be true
    // //     const locationChanged =
    // //       this.props.location !== prevProps.location;
    // //     console.log(this.props.location);
        
    //   }
      
    // callback = (key) => {
    //     console.log('key', key);
    //     console.log('window.location.pathname', window.location.pathname);
    //     // console.log(this.props.history);
        
    //     // window.location.pathname = key;
    //     // this.props.history.push('/auth/signin');
    // };
    render() {
        // const { match, location, history } = this.props;
        // console.log(location);
        // let history = useHistory();
        // if (window.location.pathname != this.state.key)
        //     console.log('redirect');
            
            // this.props.history.push(this.state.key);

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