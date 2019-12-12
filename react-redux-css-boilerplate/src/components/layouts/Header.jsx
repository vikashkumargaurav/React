import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="nvg--container">
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>SignUp</NavLink>
                <NavLink to='/'>Home</NavLink>
            </div>
        );
    }
}

export default Header;