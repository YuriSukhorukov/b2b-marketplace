import React from 'react';
import { Form , Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { AuthAPI } from '../../api/index';

const layout = {
    labelCol: { span: 8 },
  };

export default () => {
    const onFinish = values => {
      console.log('Success:', values);

      let res = AuthAPI.checkEmail();
      console.log(res);
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };  
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Введите адрес электронной почты' }]}
            >
                <Input placeholder="Электронная почта"/>
            </Form.Item>
            <Form.Item>
                <Button 
                    htmlType="submit" 
                    block 
                    type="primary" 
                >
                    Продолжить
                </Button>
            </Form.Item>
        </Form>
    );
  };