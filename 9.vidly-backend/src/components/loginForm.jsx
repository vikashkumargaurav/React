import React from 'react';
import Joi from 'joi-browser'
import Form from "./reusable/form";
import {login} from '../services/authService';
import * as userService from "../services/userService";
import {toast} from "react-toastify";

class LoginForm extends Form {

    state = {
        account: {email: '', password: ''},
        errors: {},
    };

    schema = {
        email: Joi.string().email().label('Email'), // use label if you want to give friendly label name (optional)
        password: Joi.string().required().label('Password'),
    };


    doSubmit = async () => {


        try {
            const {data: jwtToken} = await login(this.state.account);
            console.log(jwtToken);
            const base64Encoding = btoa(jwtToken);
            localStorage.setItem('token', base64Encoding);
            // this.props.history.push('/');
            // reloading the whole app to change the login status bcz app component life cycle method componentDidMount() will be called only once when app is launched
            window.location = '/';
        } catch (e) {

            if (e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.email = e.response.data;
                return this.setState({errors});
            }
            if (e.response) {
                toast.error(e.response.data);
                console.log(e.response);
            }

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
                <h3 className="text-secondary">Login Form</h3>
                {/*By default form will be submitted like normal form, so we need to change the behaviour*/}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'Email', false, 'email')}
                    {this.renderInput('password', 'Password', false, 'password', this.renderChild())}
                    {this.renderButton('Login')}
                </form>

            </div>
        );
    }
}

export default LoginForm;