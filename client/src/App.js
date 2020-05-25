/** App: Component that renders home page with description of Jobly and depending
 *  on token status, either a Login button (if it doesn't exist), or a 'welcome back' message
 *    - Holds state of token and username
 *    - Provider of TokenContext is located here
 *    - Used in Index component
 *    - Uses Routes and Navigation components
 */


import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";

import Routes from "./Routes";
import Navigation from "./Navigation";
import JoblyApi from "./JoblyApi";
import TokenContext from "./tokenContext";


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [requestCompleted, setRequestCompleted] = useState(false);

  /** handleLogout: logs out current user by removing token and resetting user context to null */

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    return <Redirect to='/login' />
  }

  /** Sets the current user in state from the username in the token
   *  If token is null, set the current user to null to logout
   */

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem('token', token);
      let payload = jwt.decode(token);
      let updatedUsername = payload.username;

      async function fetchUser() {
        try {
          let resp = await JoblyApi.request(`users/${updatedUsername}`);
          setUser(resp.user);
          // waits until user has been set to change requestCompleted state to true
          setRequestCompleted(true);
        } catch (err) {
          console.error(err);
        }
      }
      fetchUser();
    } else {
      setUser(null);
      setRequestCompleted(true);
    }
  }, [token]);


  return (
    <div>
      <TokenContext.Provider value={{ token, setToken, user, setUser }}>
          <Navigation handleLogout={handleLogout}/>
          <div className="container">
            {requestCompleted ? <Routes /> : <div>Loading...</div>}
          </div>
      </TokenContext.Provider>
    </div >
  );
}

export default App;