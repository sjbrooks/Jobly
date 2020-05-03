import React from 'react';
import './JobCard.css';
import { Link } from 'react-router-dom';

/** JobCard: Presentational 'dumb' component that renders a div with job info and a button to apply
 *    - Holds props of a single jobData object to render (to be added: function to updateJobList 
 *      (if 'apply' button is clicked, updated application status is set))
 *    - Used in Jobs and Company components 
 *    - NOTE: jobData contains different keys depending on whether props is being passed from Jobs
 *      or Company. Jobs will send a prop jobData that contains an extra key of state (for applied status)
 * */

function JobCard({ jobData: {id, title, salary, equity, company_name, company_handle}, appliedJobs, applyToJob }) {


  let button = <button className="btn btn-danger" onClick={() => applyToJob(id)}>Apply</button>

  if (appliedJobs.has(id)) {
    console.log("Job has been applied to")
    button = <button className="JobCard-applied btn btn-danger" disabled={true}>Applied</button>
  }

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