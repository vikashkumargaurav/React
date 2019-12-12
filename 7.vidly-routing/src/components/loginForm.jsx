import React from 'react';
import Joi from 'joi-browser'
import Form from "./reusable/form";

class LoginForm extends Form {

    username = React.createRef(); // creating refs (Don't overuse this property)

    // componentDidMount() {
    //     this.username.current.focus();
    // }

    state = {
        account: {username: '', password: ''},
        errors: {},
    };

    schema = {
        username: Joi.string().required().label('Username'), // use label if you want to give friendly label name (optional)
        password: Joi.string().required().label('Password')
    };


    doSubmit = () => {
        console.log('sucessfully submitted')
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
                    {this.renderInput('username', 'Username', true)}
                    {this.renderInput('password', 'Password', false, 'password', this.renderChild())}
                    {this.renderButton('Login')}
                </form>

            </div>
        );
    }
}

export default LoginForm;