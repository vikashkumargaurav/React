import React from 'react';

const Input = ({name, type, error, value, label, onChange, children, autofocus}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type}
                   id={name}
                   className="form-control"
                   name={name}
                   value={value} /*now value attribute is attached to this.state */
                   onChange={onChange}
                /*only use 'ref' property in specific cases like focusing on element. Don;t overuse this property.Try to Handle value using this.state instead*/
                // ref={this.username}
                   autoFocus={autofocus}
                   placeholder={`Enter ${label}`}/>
            {children}

            {/*/!*conditional rendering*!/*/}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>

    );
};

export default Input;