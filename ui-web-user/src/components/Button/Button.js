import React from 'react';
import { Button } from 'antd';
import './Button.css';
import 'antd/dist/antd.css';

export default ({ children }) => <Button className={"my-btn"} type="primary" size={'large'}>{ children }</Button>;