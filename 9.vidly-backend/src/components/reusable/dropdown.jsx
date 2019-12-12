import React from 'react';

const Dropdown = ({label, error, value, list, name,  onChange}) => {
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select
                    name={name}
                    onChange={onChange}
                    value={value}
                    className="form-control"
                    id={name}>
                    <option value=''/>
                    {list.map(item =>
                        <option key={item._id} value={item._id}>{item.name}</option>
                    )}
                </select>

                {/*/!*conditional rendering*!/*/}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    };

export default Dropdown;