import React, { Children } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { UserAddOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default ({...props}) => {
    return (
        <TabPane
            tab={
                <span>
                    <UserAddOutlined />
                    Регистрация
                </span>
            } key='2' {...props}
        >
            {props.children}
        </TabPane>
    );
  };