import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Head from "../reusable/Head";
import {setName} from "../../store/actions/redux-action-list";
import {connect} from "react-redux";

class Login extends Component {

    state = {
        name: "",
        email: ""
    };

    submitForm = (event) => {
        event.preventDefault();
        if (!this.state.name && !this.state.email) return false;
        this.props.setUser(this.state.name, this.state.email);
        this.props.history.replace('/home');
    };

    render() {
        return (
            <div className="wrapper login--container">
                <Head title="Login"/>
                <p>Login Page</p>

                <form onSubmit={this.submitForm}>
                    <input value={this.state.name}
                           placeholder='name'
                           onChange={(e) => this.setState({name: e.target.value})}/>

                    <input value={this.state.email}
                           placeholder='email'
                           onChange={(e) => this.setState({email: e.target.value})}/>

                    <button>Submit</button>
                </form>

            </div>
        )
            ;
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setUser: (name, email) => dispatch(setName(name, email)),
    };
};


export default connect(null, mapDispatchToProps)(Login);