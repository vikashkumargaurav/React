import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Navbar extends Component {
    render() {
        const navItem = [
            {label: 'Home', path: '/'},
            {label: 'Products', path: '/Products'},
            {label: 'Posts', path: `/Posts/${new Date().getFullYear()}/${new Date().getMonth()}`}, // here year & month are optional parameters
            {label: 'Admin', path: '/Admin'},
        ];
        return (
            /*Use <Link> instead of <a> tag  and to instead of href page to stop sending http request every-time and behave it link a single page application*/
            // Use <NavLink> instead of <Link> while working with Navs bcz it will add class='active' dynamically when page is active
            <nav>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {navItem.map(item =>
                            <li key={item.label}>
                                <NavLink to={item.path}>{item.label}</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;