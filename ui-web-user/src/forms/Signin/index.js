// yuri@gmail.com
// sdWE343sx!

import React                            from 'react';
import { Form , Input, Button }         from 'antd';
import { boolean, number }              from "@storybook/addon-knobs";
import { CheckCircleTwoTone }           from '@ant-design/icons';
import { observer }                     from 'mobx-react';
import { Redirect }                     from 'react-router-dom';
import authStore                        from '../../stores/authStore';
import axios                            from 'axios';
// import 'antd/dist/antd.css';

const layout = {
    labelCol: { span: 8 },
};

// axios.get(`/api/v1/home`).then(response => {
//     console.log(response);
// });

const SigninForm = observer(class SigninForm extends React.Component {
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
        isPasswordFailed: false,
        isAuthorized: false,
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (this.state.isEmailAlreadyRegistered) {
            this.setState({
                isEmailAlreadyRegistered: false,
                validateStatus: undefined,
            })
        } else if (this.state.isPasswordFailed) {
            this.setState({
                isEmailAlreadyRegistered: false,
                isPasswordFailed: false,
                validateStatus: undefined,
            })
        }
    }
    onEmailFinish(values) {
        this.setState(state => ({
            validateStatus: 'validating',
            isWaiting: true
        }))
        const { email } = values;
        axios.post(`/api/v1/auth/signin/${email}`).then(response => {
            console.log(response);
            console.log(response.data.code);
            if (response.data.code == 302) {
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
            url: `/api/v1/auth/signin`,
            method: 'post',
            headers: {
                username: `${email}`,
                password: `${password}`
            }
        }).then(response => {
            // success
            this.setState(state => ({
                step: state.step = 3
            }));
            console.log(response);
            this.setState(state => ({
                isWaiting: false
            }));
            this.setState({
                isAuthorized: true
            });
        }).catch(err => {
            this.setState(state => ({
                validateStatus: "warning",
                isPasswordFailed: true,
                isWaiting: false
            }));
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

        if (this.state.isAuthorized)
            return <Redirect to="/home" push />
        
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
                        help={this.state.isEmailAlreadyRegistered && !this.state.isWaiting ? "Почта не зарегистрирована" : undefined}
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
                        validateStatus={this.state.validateStatus}
                        help={this.state.isPasswordFailed && !this.state.isWaiting ? "Неверный пароль" : undefined}
                        hasFeedback={!this.state.isWaiting}
                    >
                        <Input.Password 
                            placeholder="Пароль"
                            onChange={this.onChange} value={this.state['password']} name="password"
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
                            {this.state.isWaiting ? "Подождите..." : "Войти"}
                        </Button>
                    </Form.Item>
                </Form>
            )
        else if (this.state.step == 3)
            return(
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '26px', margin: '20px' }} />
            )
    }
});

export default SigninForm;




// const layout = {
//     labelCol: { span: 8 },
// };

// export default () => {
//     const onFinish = values => {
//       console.log('Success:', values);
//     };
//     const onFinishFailed = errorInfo => {
//       console.log('Failed:', errorInfo);
//     };  
//     return (
//         <Form
//             {...layout}
//             name="basic"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//         >
//             <Form.Item
//                 name="username"
//                 rules={[{ required: true, message: 'Введите адрес электронной почты' }]}
//             >
//                 <Input placeholder="Электронная почта"/>
//             </Form.Item>
//             <Form.Item>
//                 <Button 
//                     htmlType="submit" 
//                     block 
//                     type="primary" 
//                 >
//                     Продолжить
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
//   };