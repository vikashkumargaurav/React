import React, {Component} from 'react';


// Stateless functional component (use when a component only render markup & where no event handling occurs)(we can also use simple class approach)
// Doesn't have life-cycle methods
const Nav = (props) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                Navbar{" "}
                <span className="badge badge-secondary badge-pill ">{props.counterLength}</span>
            </a>
        </nav>
    );

};


export default Nav;