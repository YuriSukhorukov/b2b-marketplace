import React from 'react';
import { Form , Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { AuthAPI } from '../../api/index';
import { boolean, number } from "@storybook/addon-knobs";

const layout = {
    labelCol: { span: 8 },
};

const checkEmailMockResponse = () => {
    return new Promise((res, rej) => {
        setTimeout(res, 1000);
    });
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            isWaiting: false,
            isError: false
        }
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
        this.checkPassword = this.checkPassword.bind(this);

        // this.form = Form.useForm();
        console.log(this.form);
        
    }
    onFinish(values) {
        this.setState(state => ({
            isWaiting: true,
            isError: false
        }))
        checkEmailMockResponse().then(()=>{
            this.setState(state => ({
                step: state.step += 1,
                isWaiting: false,
                isError: false
            }));
            console.log('Success:', values);
        })
    }
    onFinishFailed(errorInfo) {
        console.log(this.a);
        
        this.setState(state => ({
            isWaiting: false,
            isError: true
        }))
        console.log('Failed:', errorInfo);
    }
    checkPassword(rule, value) {
        console.log(rule);
        console.log(value);
        console.log(this.props);
        
        // if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        // }
        // return Promise.reject('The two passwords that you entered do not match!');
    }
    render() {
        this.a = number("Signup step", 1);
        this.aa = boolean("Is waiting data", false);
        this.aaa = boolean("Is error validating", false);
        
        if (this.state.step == 1)
            return (
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { type: 'email', message: 'Введен неверный E-mail' },
                            { required: true, message: 'Введите E-mail' }
                        ]}
                        validateStatus={this.state.isWaiting ? "validating" : this.state.isError ? "error" : undefined}
                        help={this.state.isWaiting ? "Проверка E-mail..." : null}
                        hasFeedback
                    >
                        <Input placeholder="Электронная почта" />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            htmlType="submit" 
                            block 
                            type="primary"
                            disabled={this.state.isWaiting}
                        >
                            Продолжить
                        </Button>
                    </Form.Item>
                </Form>
            )
        else
            return(
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
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
                        rules={[
                            { required: true, message: 'Введите адрес электронной почты' },
                            { validator: this.checkPassword }
                        ]}
                    >
                        <Input.Password placeholder="Повторите пароль" />
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
    }
}

export default SignupForm;