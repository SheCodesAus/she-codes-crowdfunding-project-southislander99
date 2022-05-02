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
                <NavLink to="/" activeStyle={{ color: 'black' }}>Home</NavLink>
                <NavLink to="/project" activeStyle={{ color: 'black' }}>Projects</NavLink>
                <NavLink to="/pledge" activeStyle={{ color: 'black' }}>Make a Pledge</NavLink>
                <NavLink to="/users" activeStyle={{ color: 'black' }}>My Profile</NavLink>
                <NavLink to="/login" activeStyle={{ color: 'black' }}>Login</NavLink>
                <NavBtn>
                    <NavBtnLink to="/">Sign Up</NavBtnLink>
                </NavBtn>
            </NavMenu>
        </Nav>
    );
}

export default Navbar;