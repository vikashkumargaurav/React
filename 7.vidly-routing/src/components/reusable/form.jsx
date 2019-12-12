import React, {Component} from 'react';
import Joi from "joi-browser";
import Input from "./input";
import {getGenres} from "../../services/fakeGenreService";
import Dropdown from "./dropdown";


class Form extends Component {

    // on input change
    handleChange = ({target: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateInput(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({account, errors});
    };


    validateInput = ({name, value}) => {

        // Validating input using Joi (Only validating one input at a time)
        const obj = {[name]: value};
        console.log('obj', obj);
        const subSchema = {[name]: this.schema[name]};
        const result = Joi.validate(obj, subSchema);
        console.log(result);
        return result.error ? result.error.details[0].message : null;

        /*
         Old way of validating input

        if (name === 'username') {
            if (value.trim() === '') return 'Username is Required';
        }
        if (name === 'password') {
            if (value.trim() === '') return 'Password is Required';
        }
        */
    };

    validate = () => {

        // Validation using Joi

        const result = Joi.validate(this.state.account, this.schema, {abortEarly: false});
        console.log(result);

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;


        return errors;


        /*
         Old implementation of form validation (traditional way)

         const {account} = this.state;
         const errors = {};
         if (account.username.trim() === '') {
            errors.username = 'UserName is Required'
         }
         if (account.password.trim() === '') {
            errors.password = 'Password is Required'
         }
         return Object.keys(errors).length === 0 ? null : errors;
        */
    };

    handleSubmit = e => {
        e.preventDefault();

        /*      Working with refs
                using refs to get access to the default dom element
                const userElement = this.username.current; // returns reference to the dom element
                const userNameVal = userElement.userName;
        */
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        this.doSubmit();
        // call the server
        console.log('submitted');
    };

    renderInput(name, label, autofocus = false, type = 'text', children) {
        const {account, errors} = this.state;
        return (
            <Input
                autofocus={autofocus}
                value={account[name]}
                name={name}
                error={errors[name]}
                label={label}
                onChange={this.handleChange}
                type={type}>
                {children}
            </Input>
        );
    }

    renderDropDown(name, label, list) {
        const {account ,errors} = this.state;
        return (
            <Dropdown
                name={name}
                label={label}
                list={list}
                onChange={this.handleChange}
                error={errors[name]}
                value={account[name]}
            />
        )
    }

    renderButton(name) {
        return <button type="submit" disabled={this.validate()} className="btn btn-primary">{name}</button>
    }


}

export default Form;