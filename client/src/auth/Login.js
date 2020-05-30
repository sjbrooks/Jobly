/** Login: Component renders login/signup page, with forms for each, depending on which button is clicked
 *    - Holds state of formType (i.e., login or signup), formData, and errMsg
 *    - Used in Routes component
 *    - Uses Alert component
 */


import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from './UserContext';
import './Login.css';

import Alert from "../shared/Alert";


function Login({ login, signup }) {

  const loginFields = [
    { input: "username", label: "Username" },
    { input: "password", label: "Password" }
  ];

  const signupFields = [
    { input: "username", label: "Username" },
    { input: "password", label: "Password" },
    { input: "first_name", label: "First name" },
    { input: "last_name", label: "Last name" },
    { input: "email", label: "Email" }
  ];

  const INITIAL_FIELDS = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: ""
  };

  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({ ...INITIAL_FIELDS });
  const [errMsg, setErrMsg] = useState([]);
  const { currentUser } = useContext(UserContext);


  /** Handle login or signup depending on formType and set error message if it was unsuccessful */

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (formType === "login") {
      const result = await login(formData);
      if (!result.success) setErrMsg(result.errors);
    } else {
      const result = signup(formData);
      if (!result.success) setErrMsg(result.errors);
    }
  }

  /** Update local state with current state of input fields */

  async function handleChange (evt) {
    const { value, name } = evt.target;
    setFormData(oldForm => ({
      ...oldForm,
      [name]: value
    }));
  };

  /** renderForms: creates a login or singup form based array of input objects passed in */

  function renderForms(formTypeFields) {
    return (
      <form className="Login-form" onSubmit={handleSubmit}>
        {formTypeFields.map(field => (
          <div className="form-group" key={field.input}>
            <label className="Login-label" htmlFor={field.input}>{field.label}</label>
            <input
              className="Login-input"
              id={field.input}
              name={field.input}
              type={field.input === "password" ? "password" : "text"}
              value={formData[field.input]}
              onChange={handleChange}
            />
          </div>
        ))}
        {errMsg.length !== 0 ? <Alert msg={errMsg} type="danger" alertClose={() => setErrMsg("")} /> : null}
        <button className="btn btn-primary Login-submit">Submit</button>
      </form>
    )
  }

  // if user is already signed in, redirect them to jobs page
  if (currentUser !== null) {
    return <Redirect to="/jobs" />
  }

  /** render form */

  return (
    <div className="Login">
      <div className="Login-form-buttons">
        <button className={formType === "login" ? "btn btn-primary" : "btn btn-light"} onClick={() => setFormType("login")}>Login</button>
        <button className={formType === "signup" ? "btn btn-primary" : "btn btn-light"} onClick={() => setFormType("signup")}>Sign up</button>
      </div>
      {formType === "login" ? renderForms(loginFields) : renderForms(signupFields)}
    </div>
  );
}

export default Login;