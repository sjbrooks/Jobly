/** Navigation: Component that renders one of two navigation bars based on if a token exists
 *    - Holds props of handleLogout, a function to log out a logged in user
 *    - Used in App component
 * */


import React, { useContext } from 'react';
import './Navigation.css';
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";


function Navigation({ handleLogout }) {

  const { currentUser } = useContext(UserContext);

  /* Returns correct navbar based on value of token */

  function returnCorrectNav() {
    // Navbar for logged in users
    if (currentUser !== null) {
      return (
        <nav className="Navigation navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" exact to="/">
            Jobly
          </NavLink>
          <ul className="navbar-nav ml-auto">
            <li className="Navigation nav-item">
              <NavLink exact to="/companies">
                Companies
              </NavLink>
            </li>
            <li className="Navigation nav-item">
              <NavLink exact to="/jobs">
                Jobs
              </NavLink>
            </li>
            <li className="Navigation nav-item">
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="Navigation nav-item">
              <NavLink to="/" onClick={handleLogout}>
                Log out
              </NavLink>
            </li>
            </ul>
        </nav>
      )
    } else {

      // Navbar for logged out users
      return (
        <nav className="Navigation navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" exact to="/">
          Jobly
        </NavLink>
        <ul className="navbar-nav ml-auto">
          <li className="Navigation nav-item">
            <NavLink exact to="/login">
              Login
            </NavLink>
            </li>
            </ul>
          </nav>
        )
      }
    }

  return (
          <div>
            {returnCorrectNav()}
          </div>
  );
}

export default Navigation;