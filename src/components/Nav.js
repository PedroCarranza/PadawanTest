import { Link, useHistory } from "react-router-dom";
import React from "react"

import "./Nav.css"

function Nav() {
    let history = useHistory();

    return (
        <nav className="navbar">
            <a className="navbarLogo" onClick={() => { if (window.location.pathname !== "/") history.push("/") }}>
                Padawans
            </a>
            <ul className="navMenu">
                <li className="navItem">
                    <Link to="../" className="navLinks">
                        Início
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;