/** Profile: Component renders a form with current user's profile data
 *    - Holds state of updated, a status that tracks if the user profile has been updated via form submission
 *    - Used in Routes component
 *    - Uses Alert component
 */


import React, { useState, useContext, useCallback } from 'react';
import './Profile.css';
import JoblyApi from "../api/JoblyApi";
import TokenContext from '../auth/tokenContext';

import Alert from '../shared/Alert';


function Profile() {

  const updateFields = [
    { input: "first_name", label: "First name" },
    { input: "last_name", label: "Last name" },
    { input: "email", label: "Email" },
    { input: "photo_url", label: "Photo Url" },
    { input: "password", label: "Re-enter Password" }
  ];

  const { user, setUser } = useContext(TokenContext);

  const INITIAL_FIELDS = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: "",
    photo_url: user.photo_url
  };
  const [formData, setFormData] = useState({ ...INITIAL_FIELDS });

  const INITIAL_ALERT = { type: "", msgs: [] };
  const [alertObj, setAlertObj] = useState({ ...INITIAL_ALERT });


  /** updateUser: makes API call to update user */

  const updateUser = useCallback(async () => {
    try {
      let resp = await JoblyApi.request(`users/${user.username}`, formData, "patch");
      setUser(resp.user);
      setAlertObj({ type: "success", msgs: ["User Profile Updated"] });
      setFormData({ ...INITIAL_FIELDS });
    } catch (err) {
      setAlertObj({ type: "danger", msgs: err })
    }
  }, [formData]);

  /** Upon submission of form, prevent default behavior and make API call to update User */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    updateUser();
  }

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setFormData(oldForm => ({
      ...oldForm,
      [name]: value
    }));
  }

  /** Form to update user profile */
  let profileFormFields = (
    <div>
      <div className="form-group">
        <label className="Profile-label" htmlFor="username">Username</label>
        <input
          className="Profile-input"
          id="username"
          name="username"
          type="text"
          value={user.username}
          disabled={true}
        />
      </div>
      {updateFields.map(field => (
        <div className="form-group" key={field.input}>
          <label className="Profile-label" htmlFor={field.input}>{field.label}</label>
          <input
            className="Profile-input"
            id={field.input}
            name={field.input}
            type={field.input === "password" ? "password" : "text"}
            value={formData[field.input]}
            onChange={handleChange}
          />
        </div>))}
    </div>
  );

  //********* REWRITE TO MAKE EASIER TO READ */
  let alertBox = (alertObj.msgs.length !== 0 ? <Alert msg={alertObj.msgs} type={alertObj.type} alertClose={() => setAlertObj({ ...INITIAL_ALERT })} /> : null)

  /** render form */
  return (
    <div className="Profile">
      <h2>{user.first_name}'s Profile</h2>
      <form className="Profile-form" onSubmit={handleSubmit}>
        {profileFormFields}
        <button className="btn btn-primary Login-submit" > Submit</button>
      </form >
      <div>
        {alertBox}
      </div>
    </div>
  );
}

export default Profile;