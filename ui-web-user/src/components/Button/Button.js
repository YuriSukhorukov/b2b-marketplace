import React from 'react';
import { Button } from 'antd';
import './Button.css';
import 'antd/dist/antd.css';

export default ({ children, htmlType, block }) => <Button htmlType={htmlType} className={"my-btn"} type="primary" size={'large'} block={ block }>{ children }</Button>;