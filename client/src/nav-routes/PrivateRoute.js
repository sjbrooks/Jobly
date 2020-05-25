import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import TokenContext from "../auth/tokenContext";

function PrivateRoute({ exact, path, children }) {
  const { user } = useContext(TokenContext);

  if (!user && (path !== "/login" && path !== "/")) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
