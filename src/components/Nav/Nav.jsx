import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
    return(
        <Nav>
            <NavLogo to="/">Logo</NavLogo>
            <Bars />
        
            <NavMenu>
                <NavLink to="/" activestyle={{ color: 'black' }}>Home</NavLink>
                <NavLink to="/project" activestyle={{ color: 'black' }}>Projects</NavLink>
                <NavLink to="/create-project" activestyle={{ color: 'black' }}>Create a Project</NavLink>
                <NavLink to="/users" activestyle={{ color: 'black' }}>My Profile</NavLink>
                <NavLink to="/login" activestyle={{ color: 'black' }}>Login</NavLink>
                <NavBtn>
                    <NavBtnLink to="/">Sign Up</NavBtnLink>
                </NavBtn>
            </NavMenu>
        </Nav>
    );
}

export default Navbar;