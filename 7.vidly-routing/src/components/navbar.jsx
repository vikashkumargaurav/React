import React from 'react';
import {Link, NavLink} from "react-router-dom";

const Navbar = () => {

    const navItems = [
        {id: 1, name: 'Movies', path: '/movies'},
        {id: 2, name: 'Customer', path: '/customer'},
        {id: 3, name: 'Rental', path: '/rental'},
        {id: 4, name: 'Login', path: '/login'},
        {id: 5, name: 'Register', path: '/register'}
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-lg-5">
            <Link className="navbar-brand" to='/'>Vidly</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    {navItems.map(item => (
                        <NavLink className="nav-item nav-link" to={item.path} key={item.id}>{item.name}</NavLink>
                    ))}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;