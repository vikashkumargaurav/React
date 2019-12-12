import React, {Component} from 'react';
import Form from "./reusable/form";
import Joi from "joi-browser";

class RegisterForm extends Form {

    state = {
        account: {username: '', password: '', name: ''},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'), // use label if you want to give friendly label name (optional)
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    };

    render() {
        return (
            <div>
                <h3 className="text-secondary">Register</h3>
                {/*By default form will be submitted like normal form, so we need to change the behaviour*/}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', true)}
                    {this.renderInput('password', 'Password', false, 'password')}
                    {this.renderInput('name', 'Password')}
                    {this.renderButton('Register')}
                </form>

            </div>
        );
    }
}

export default RegisterForm;