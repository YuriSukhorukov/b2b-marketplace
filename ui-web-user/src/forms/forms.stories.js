import React from 'react';
import SignupForm from './Signup';
import SigninForm from './Signin';

export default {
  title: 'Forms'
};

export const Signup = () => <SignupForm />;
export const Signin = () => <SigninForm />;