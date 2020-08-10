import React from 'react';
import { Form , Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { AuthAPI } from '../../api/index';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

const layout = {
    labelCol: { span: 8 },
};

export default () => {
    const step = number("Signup step", 1);

    const onFinish = values => {
      console.log('Success:', values);
      let res = AuthAPI.checkEmail();
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }; 

    if (step == 1)
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
        )
    else
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите адрес электронной почты' }]}
                >
                    <Input.Password 
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item
                    name="password-confirm"
                    rules={[{ required: true, message: 'Введите адрес электронной почты' }]}
                >
                    <Input.Password
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Button 
                        htmlType="submit" 
                        block 
                        type="primary" 
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        )
  };