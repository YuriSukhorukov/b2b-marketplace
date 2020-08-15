import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

export default ({ placeholder }) => <Input placeholder={ placeholder } className={ "my-input" } size={'large'} />;