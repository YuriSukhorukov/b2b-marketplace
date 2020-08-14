import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { LoginOutlined } from '@ant-design/icons'

const { TabPane } = Tabs;

export default ({...props}) => {
    return (
        <TabPane 
            tab={
                <span>
                    <LoginOutlined />
                    Вход
                </span>
            } key='1' {...props}
        >
            {props.children}
        </TabPane>
    );
  };