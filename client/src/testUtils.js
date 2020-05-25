import React from "react";
import TokenContext from "./auth/TokenContext";

const testUser = {
  username: "test-user",
  first_name: "test",
  last_name: "user",
  email: "test@user.com",
  photo_url: null
};

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1OTA0MTAyNzd9.1ywOZKnS9aolKFLdElo-uMCRSDk3YzOgIObUTzbv6D0";

const UserProvider = ({ children, token = testToken, user = testUser }) => (
  <TokenContext.Provider value={{token, user}}>
    {children}
  </TokenContext.Provider>
);

export { UserProvider };
