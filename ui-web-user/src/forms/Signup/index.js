import React                            from 'react';
import { Form , Input, Button }         from 'antd';
import { boolean, number }              from "@storybook/addon-knobs";
import { AuthAPI }                      from '../../api/index';
import 'antd/dist/antd.css';

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
        this.onFinish           = this.onFinish.bind(this);
        this.onFinishFailed     = this.onFinishFailed.bind(this);
        this.checkPassword      = this.checkPassword.bind(this);
        this.onChange           = this.onChange.bind(this);        
    }
    state = {
        step: 1,
        isWaiting: false,
        isError: false,
        'email': null,
        'password': null,
        'password-confirm': null
    }
    onChange(event) {
        console.log(event);
        console.log(event.target.value);
        console.log(event.target);
        console.log(event.target.name);

        this.setState({
            [event.target.name]: event.target.value
        })
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
        this.setState(state => ({
            isWaiting: false,
            isError: true
        }))
        console.log('Failed:', errorInfo);
    }
    checkPassword(rule, value) {        
        if (value == this.state['password']) {
            return Promise.resolve();
        }
        return Promise.reject('Введенные вами пароли не совпадают');
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
                        <Input 
                            placeholder="Электронная почта" 
                            onChange={this.onChange} value={this.state['email']} name="email"
                        />
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
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password 
                            placeholder="Пароль"
                            onChange={this.onChange} value={this.state['password']} name="password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password-confirm"
                        rules={[
                            { required: true, message: 'Повторите пароль' },
                            { validator: this.checkPassword }
                        ]}
                    >
                        <Input.Password 
                            placeholder="Повторите пароль" 
                            onChange={this.onChange} value={this.state['password-confirm']} name="password-confirm"
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
    }
}

export default SignupForm;