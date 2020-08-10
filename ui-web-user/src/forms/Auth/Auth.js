import React from 'react';
import { Tabs, Form , Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './Auth.css';

const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 8 },
  };

export default () => {
    const onFinish = values => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const callback = (key) => {
        console.log(key);
    };
  
    return (
        <Tabs className="auth-form auth-form__tabs_margin_bottom auth-form__tabs_padding" defaultActiveKey="1" onChange={callback} centered={true}>
            <TabPane tab="Вход" key="1">
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
            </TabPane>
            <TabPane tab="Регистрация" key="2">
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
                            type="primary"
                            block
                        >
                            Продолжить
                        </Button>
                    </Form.Item>
                </Form>
            </TabPane>
        </Tabs>
    );
  };