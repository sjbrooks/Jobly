import React from "react";
import UserContext from "./auth/UserContext";

const testUser = {
  username: "test-user",
  first_name: "test",
  last_name: "user",
  email: "test@user.com",
  photo_url: null
};

const UserProvider = ({ children, currentUser = testUser }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
