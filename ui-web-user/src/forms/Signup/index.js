// yuri@gmail.com
// sdWE343sx!

import React                            from 'react';
import { Form , Input, Button }         from 'antd';
import { boolean, number }              from "@storybook/addon-knobs";
import { CheckCircleTwoTone }          from '@ant-design/icons';
import { observer }                     from 'mobx-react';
import authStore                        from '../../stores/authStore';
import axios                            from 'axios';
import 'antd/dist/antd.css';

const layout = {
    labelCol: { span: 8 },
};

const checkEmailMockResponse = () => {
    return new Promise((res, rej) => {
        setTimeout(()=>{
            res();
            authStore.token = '213!E#R@';
        }, 2000);
    });
}

const SignupForm = observer(class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.onEmailFinish              = this.onEmailFinish.bind(this);
        this.onEmailFinishFailed        = this.onEmailFinishFailed.bind(this);
        this.onPasswordFinish           = this.onPasswordFinish.bind(this);
        this.onPasswordFinishFailed     = this.onPasswordFinishFailed.bind(this);
        this.checkPassword              = this.checkPassword.bind(this);
        this.onChange                   = this.onChange.bind(this);      
        this.checkEmail                 = this.checkEmail.bind(this);        
    }
    state = {
        step: 1,
        'email': null,
        'password': null,
        'password-confirm': null,
        validateStatus: undefined,
        isWaiting: false,
        isLoading: false,
        isEmailAlreadyRegistered: false,
        // help: ''
    }
    async componentDidMount() {
        // let userData = await API.get('/', {params: {results: 1,inc: 'name,email,picture'}});
        //   userData = userData.data.results[0];
        //   console.log(userData);
        // let email = 'yuri@gmail.com';
        // let response = await axios.get(`/api/v1/auth/signup/email/${email}`);
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (this.state.isEmailAlreadyRegistered) {
            this.setState({
                isEmailAlreadyRegistered: false,
                validateStatus: undefined
            })
        }
    }
    onEmailFinish(values) {
        this.setState(state => ({
            validateStatus: 'validating',
            isWaiting: true
        }))
        const { email } = values;
        axios.get(`/api/v1/auth/signup/email/${email}`).then(response => {
            console.log(response);
            console.log(response.data.code);
            if (response.data.code != 302) {
                this.setState(state => ({
                    step: 2,
                    validateStatus: undefined,
                    isEmailAlreadyRegistered: false,
                    isWaiting: false
                }));
                console.log('Success:', values);
            } else {
                this.setState(state => ({
                    validateStatus: "warning",
                    isEmailAlreadyRegistered: true,
                    isWaiting: false
                }));
            }
        });
    }
    onEmailFinishFailed(errorInfo) {        
        console.log('Failed:', errorInfo);
    }

    onPasswordFinish(values) {        
        console.log('Success:', values);

        const email = this.state.email;
        const password = this.state.password;

        this.setState(state => ({
            isWaiting: true
        }))

        axios({
            url: `/api/v1/auth/signup`,
            method: 'post',
            headers: {
                email: `${email}`,
                password: `${password}`
            }
        }).then(response => {
            this.setState(state => ({
                step: state.step = 3
            }));
            console.log(response);
            this.setState(state => ({
                isWaiting: false
            }))
        });

        console.log(email, password);
    }
    onPasswordFinishFailed(errorInfo) {        
        console.log('Failed:', errorInfo);
    }

    checkPassword(rule, value) {     
        if (value == this.state['password'])
            return Promise.resolve();
        else if (value)
            return Promise.reject('Введенные вами пароли не совпадают');
    }
    checkEmail(rule, value) {
        if (!value) 
            return Promise.reject('Введите E-mail');

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        
        const isValid = re.test(String(value).toLowerCase());

        if (isValid)
            return Promise.resolve();
        else 
            return Promise.reject('Введен неверный E-mail');
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
                    onFinish={this.onEmailFinish}
                    onFinishFailed={this.onEmailFinishFailed}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { type: 'email', message: 'Введен неверный E-mail' },
                            { required: true, message: 'Введите E-mail' }
                        ]}
                        validateStatus={this.state.validateStatus}
                        help={this.state.isEmailAlreadyRegistered && !this.state.isWaiting ? "Почта уже зарегистрирована" : undefined}
                        hasFeedback={!this.state.isWaiting}
                    >
                        <Input 
                            placeholder="Электронная почта" 
                            onChange={this.onChange} value={this.state['email']} name="email"
                            disabled={this.state.isWaiting}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            htmlType="submit" 
                            block 
                            type="primary"
                            loading={this.state.isWaiting}
                        >
                            {this.state.isWaiting ? "Подождите..." : "Продолжить"}
                        </Button>
                    </Form.Item>
                </Form>
            )
        else if (this.state.step == 2)
            return(
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onPasswordFinish}
                    onFinishFailed={this.onPasswordFinishFailed}
                >
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Введите пароль' }
                        ]}
                        hasFeedback={!this.state.isWaiting}
                    >
                        <Input.Password 
                            placeholder="Пароль"
                            onChange={this.onChange} value={this.state['password']} name="password"
                            disabled={this.state.isWaiting}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password-confirm"
                        rules={[
                            { required: true, message: 'Повторите пароль' },
                            { validator: this.state['password-confirm'] ? this.checkPassword : undefined }
                        ]}
                        hasFeedback={!this.state.isWaiting}
                    >
                        <Input.Password 
                            placeholder="Повторите пароль" 
                            onChange={this.onChange} value={this.state['password-confirm']} name="password-confirm"
                            disabled={this.state.isWaiting}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            htmlType="submit" 
                            block 
                            type="primary"
                            loading={this.state.isWaiting}
                        >
                            {this.state.isWaiting ? "Подождите..." : "Зарегистрироваться"}
                        </Button>
                    </Form.Item>
                </Form>
            )
        else if (this.state.step == 3)
            return(
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '26px', margin: '20px' }} />
            )
    }
})

export default SignupForm;