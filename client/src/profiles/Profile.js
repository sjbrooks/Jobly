/** Profile: Component renders a form with current user's profile data
 *    - Holds state of updated, a status that tracks if the user profile has been updated via form submission
 *    - Used in Routes component
 *    - Uses Alert component
 */


import React, { useState, useContext, useCallback } from 'react';
import './Profile.css';
import JoblyApi from "../api/JoblyApi";
import UserContext from '../auth/UserContext';

import Alert from '../shared/Alert';


function Profile() {

  const updateFields = [
    { input: "first_name", label: "First name" },
    { input: "last_name", label: "Last name" },
    { input: "email", label: "Email" },
    { input: "photo_url", label: "Photo Url" },
    { input: "password", label: "Re-enter Password" }
  ];

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const INITIAL_FIELDS = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    password: "",
    photo_url: currentUser.photo_url
  };
  const [formData, setFormData] = useState({ ...INITIAL_FIELDS });

  const INITIAL_ALERT = { type: "", msgs: [] };
  const [alertObj, setAlertObj] = useState({ ...INITIAL_ALERT });


  /** updateUser: makes API call to update user */

  const updateUser = useCallback(async () => {
    try {
      let resp = await JoblyApi.request(`users/${currentUser.username}`, formData, "patch");
      setCurrentUser(resp.user);
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
          value={currentUser.username}
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

  /* shows an alert message if there was an error with updating profile */

  const alertBox = (
    alertObj.msgs.length > 0 ?
      <Alert msg={alertObj.msgs} type={alertObj.type} alertClose={() => setAlertObj({ ...INITIAL_ALERT })} />
      : null
  )

  /** render form */
  return (
    <div className="Profile">
      <h2>{currentUser.first_name}'s Profile</h2>
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