/* 
Name: Kevin, Matt, Aaryan, Camryn
Simple nav bar - From sample code
*/ 
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    // get the user's name
    const { user } = this.props;
    console.log(user); 
    console.log(user ? user.role : 'User is null');

    // display certain components based on user role
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {user && user.role === 'student' && (
              <React.Fragment>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
                <NavLink to="/labs" className="nav-link">
                  Lab Scheduling
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
            {user && user.role === 'admin' && (
              <React.Fragment>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
                <NavLink to="/absence" className="nav-link">
                  Absence Tracking
                </NavLink>
                <NavLink to="/labmanager" className="nav-link">
                  Lab Manager
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
          </div>
          {user && (
            <span className="navbar-text">
              Welcome {`${user.firstName || ''} ${user.lastName || ''}`}
            </span>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;