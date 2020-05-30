import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser && (path !== "/login" && path !== "/")) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
