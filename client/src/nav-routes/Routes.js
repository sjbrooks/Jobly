/** Routes: Component that performs client-side routing for Jobly
 *    - Used in App component
 *    - Uses Home, Companies, Company, Jobs, Login, and Profile components */

import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";

import Home from "../home/Home"
import Companies from "../companies/Companies"
import Company from "../companies/Company"
import Jobs from "../jobs/Jobs"
import Login from "../auth/Login"
import Profile from "../profiles/Profile"


function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <PrivateRoute exact path="/companies">
        <Companies />
      </PrivateRoute>

      <PrivateRoute exact path="/companies/:handle">
        <Company />
      </PrivateRoute>

      <PrivateRoute exact path="/jobs">
        <Jobs />
      </PrivateRoute>

      <PrivateRoute exact path="/profile">
        <Profile />
      </PrivateRoute>

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
