/** Jobs: Component renders a list of all jobs that match search term
 *    - Holds state of searchTerm, a string of the query search term from the search
 *      bar form, and jobsList, an array of job objects
 *    - Used in Routes component
 *    - Uses Search and JobCard components
 */


import React, { useState, useEffect } from 'react';
import './Jobs.css';
import JoblyApi from "../api/JoblyApi";

import Search from "../shared/Search"
import JobCard from "./JobCard"


function Jobs() {

  const [searchTerm, setSearchTerm] = useState("");
  const [jobsList, setJobsList] = useState(null);

  /* makes API call for filtered jobs upon change in searchTerm */

  async function fetchJobs() {
    console.log("In Jobs, made it into fetchJobs")
    try {
      let resp = await JoblyApi.request(`jobs?search=${searchTerm}`);
      setJobsList(resp.jobs);

    } catch (err) {
      console.log(err);
    }
  };

  /* Run fetchJobs upon submission of search */

  useEffect(() => {
    fetchJobs();
  }, [searchTerm]);

  /* Makes API call to update application status of a job for the current user to 'applied' */

  async function applyToJob(id) {
    try {
      let resp = await JoblyApi.request(`jobs/${id}/apply`, {}, "post");
      setJobsList(j => j.map(job =>
        job.id === id ? { ...job, state: resp.message} : job
      ));
    } catch (err) {
      console.log(err);
    }
  }

  /* Ensure that jobsList has been set before passing them to each JobCard */

  if (jobsList === null) {
    return <div>...Loading</div>
  }

  let jobCards = jobsList.map(jobData => (
    <JobCard key={jobData.id} jobData={jobData} applyToJob={applyToJob} />
  ));

  return (
    <div className="Jobs">
      <Search setSearchTerm={setSearchTerm} />
      <div>
        {jobCards}
      </div>
    </div>
  )
}

export default Jobs;