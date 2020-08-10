import React from 'react';
import Signup from '../../forms/Signup/index';
import Signin from '../../forms/Signin/index';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

const { TabPane } = Tabs;

export default () => {
    const callback = (key) => {
        console.log(key);
    };
    return (
        <Tabs className="auth-form auth-form__tabs_margin_bottom auth-form__tabs_padding" defaultActiveKey="1" onChange={callback} centered={true}>
            <TabPane tab="Вход" key="1">
                <Signin />
            </TabPane>
            <TabPane tab="Регистрация" key="2">
                <Signup />
            </TabPane>
        </Tabs>
    );
  };