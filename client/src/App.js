/** App: Component that renders home page with description of Jobly and depending
 *  on token status, either a Login button (if it doesn't exist), or a 'welcome back' message
 *    - Holds state of token and username
 *    - Provider of UserContext is located here
 *    - Used in Index component
 *    - Uses Routes and Navigation components
 */


import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";

import Routes from "./nav-routes/Routes";
import Navigation from "./nav-routes/Navigation";
import JoblyApi from "./api/JoblyApi";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./shared/LoadingSpinner";


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);
  const [requestCompleted, setRequestCompleted] = useState(false);

  /** handleLogout: logs out current user by removing token and resetting user context to null */

  function handleLogout() {
    localStorage.removeItem('token');
    setCurrentUser(null);
    return <Redirect to='/' />
  }

  /** Sets the current user in state from the username in the token
   *  If token is null, set the current user to null to logout
   */

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem('token', token);
      const { username } = jwt.decode(token);

      async function fetchUser() {
        try {
          let resp = await JoblyApi.request(`users/${username}`);
          setCurrentUser(resp.user);
          // waits until user has been set to change requestCompleted state to true
          setRequestCompleted(true);
        } catch (err) {
          console.error(err);
        }
      }
      fetchUser();
    } else {
      setCurrentUser(null);
      setRequestCompleted(true);
    }
  }, [token]);

  function returnRoutes() {
    if (requestCompleted !== true) {
      return <LoadingSpinner />
    } else {
      return <Routes login={login} signup={signup} />
    }
  }

  /** login: site-wide login */

  async function login(loginData) {
    let { username, password } = loginData;
    try {
      let resp = await JoblyApi.request('login', { username, password }, "post");
      setToken(resp.token);
      return { success: true }
    } catch (err) {
      return { success: false, errors: err }
    }
  }

  /** signup: site-wide user signup */

  async function signup(signupData) {
    try {
      let resp = await JoblyApi.request('users', signupData, "post");
      setToken(resp.token);
      return { success: true }
    } catch (err) {
      return { success: false, errors: err }
    }
  }


  return (
    <div>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navigation handleLogout={handleLogout} />
        {returnRoutes()}
      </UserContext.Provider>
    </div >
  );
}

export default App;