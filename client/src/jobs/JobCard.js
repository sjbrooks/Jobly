/** JobCard: Component that renders a div with job info and a button to apply
 *    - Holds props of a single jobData object to render and an applyToJob function to update state key in jobData to "applied"
 *    - Used in Jobs and Company components
 */


import React from 'react';
import './JobCard.css';
import { Link } from 'react-router-dom';


function JobCard({ jobData: {id, title, salary, equity, company_name, company_handle, state}, applyToJob }) {

  let button = <button
                className="btn btn-danger"
                disabled={state}
                onClick={() => applyToJob(id)}>
                  <b>{state === "applied" ? "APPLIED" : "APPLY"}</b>
                </button>

  return (
    <div className="JobCard">
      <h5>{title} at <Link to={`/companies/${company_handle}`}>{company_name}</Link></h5>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
      {button}
    </div>
  )
}

export default JobCard;
