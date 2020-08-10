import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './Input.css';

export default ({ placeholder }) => <Input placeholder={ placeholder } className={ "my-input" } size={'large'} />;