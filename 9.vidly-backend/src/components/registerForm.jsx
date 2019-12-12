import React from 'react';
import Joi from 'joi-browser'
import Form from "./reusable/form";
import * as userService from "../services/userService"
import {toast} from "react-toastify";

class RegisterForm extends Form {


    state = {
        account: {email: '', password: '', name: ''},
        errors: {},
    };

    schema = {
        email: Joi.string().email().label('Email'), // use label if you want to give friendly label name (optional)
        password: Joi.string().required().label('Password'),
        name: Joi.string().required().label('Name')
    };


    doSubmit = async () => {
        try {
            const user = this.state.account;
            const response = await userService.register(user);
            const jwtToken = response.headers['x-auth-token'];
            const base64Encoding = btoa(jwtToken);
            localStorage.setItem('token', base64Encoding);
            // this.props.history.push('/');
            console.log(response);
            toast.success('User Successfully Registered');
            window.location = '/';
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.name = e.response.data;
                return this.setState({errors});

            }
            toast.error(e.response.data);
            console.log(e.response);
        }
    };

    renderChild() {
        return (
            <small id="passwordHelp" className="form-text text-muted">We'll never share your details with
                anyone else.
            </small>);
    }

    render() {
        return (
            <div>
                <h3 className="text-secondary">Registration Form</h3>
                {/*By default form will be submitted like normal form, so we need to change the behaviour using e.preventDefault()*/}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name', 'Name', true)}
                    {this.renderInput('email', 'Email', false, 'email')}
                    {this.renderInput('password', 'Password', false, 'password', this.renderChild())}
                    {this.renderButton('Register')}
                </form>

            </div>
        );
    }
}

export default RegisterForm;