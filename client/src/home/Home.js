/** Home: Component that renders home page with description of Jobly and depending
 *  on token status, either a Login button (if it doesn't exist), or a 'welcome back' message
 *    - Used in Routes component
 */


import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import UserContext from "../auth/UserContext";


function Home() {

  const { currentUser } = useContext(UserContext);

  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs in one convenient place.</p>
      {currentUser !== null ? <h4>Welcome Back!</h4> : <Link to="/login"><button className="btn btn-primary home-login-button">Log in</button></Link>}
    </div>
  )
}

export default Home;