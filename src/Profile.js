import React, { useState, useContext, useCallback } from 'react';
import './Profile.css';
import JoblyApi from './JoblyApi';
import TokenContext from './tokenContext';
import Alert from './Alert';
import JobCard from './JobCard';

/** Profile: Component renders a form with current user's profile data
 *    - Holds state of updated, a status that tracks if the user profile has been updated via form submission
 *    - Used in Routes component
 *    - Uses Alert component
 */

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

  const appliedJobs = new Set(user.jobs.filter(j => j.state === 'applied').map(j => j.id));


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
  let profileForm = (<form onSubmit={handleSubmit}>
    {updateFields.map(field => (
      <div className="form-group" key={field.input}>
        <label htmlFor={field.input}>{field.label}</label>
        <input
          className="Profile-input"
          id={field.input}
          name={field.input}
          type={field.input === "password" ? "password" : "text"}
          value={formData[field.input]}
          onChange={handleChange}
        />
      </div>
    ))}
    <button className="btn btn-primary Login-submit">Submit</button>
  </form>)

//********* REWRITE TO MAKE EASIER TO READ */
let alertBox = (alertObj.msgs.length !== 0 ? <Alert msg={alertObj.msgs} type={alertObj.type} alertClose={() => setAlertObj({ ...INITIAL_ALERT })} /> : null)

let jobCards = user.jobs.map(jobData => (
  <JobCard key={jobData.id} jobData={jobData} appliedJobs={appliedJobs} />
));

  /** render form */
  return (
    <div className="Profile">
      <div className="Profile-form">
        <h2>{user.first_name}'s Profile</h2>
        <div>
          <span><b>Username</b> {user.username}</span>
        </div>
        <div>
          {profileForm}
        </div>
        <div>
          {alertBox}
        </div>
        <div className="Profile-jobs">
          <h2>Your Jobs</h2>
          {jobCards}
        </div>
      </div>
    </div>
  );
}

export default Profile;