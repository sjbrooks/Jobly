import React, { useState, useEffect, useContext, useCallback } from 'react';
import './Jobs.css';
import JoblyApi from "./JoblyApi";

import Search from "./Search"
import JobCard from "./JobCard"
import TokenContext from './tokenContext';


/** Jobs: Component renders a list of all jobs that match search term
 *    - Holds state of searchTerm, a string of the query search term from the search 
 *      bar form, and jobsList, an array of job objects
 *    - Used in Routes component
 *    - Uses Search and JobCard components
 */

function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobsList, setjobsList] = useState(null);
  // const {user, setUser} = useContext(TokenContext);
  const [appliedJobs, setAppliedJobs] = useState(null);

  // useCallback that will make API call for filtered jobs upon change in searchTerm
  const fetchJobs = useCallback(async () => {
    console.log("In Jobs, made it into fetchJobs")
    try {
      let resp = await JoblyApi.request(`jobs?search=${searchTerm}`);
      setjobsList(resp.jobs);

      let appliedJobsSet = new Set(resp.jobs.filter(j => j.state === 'applied').map(j => j.id));
      setAppliedJobs(appliedJobsSet);

    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  // run fetchJobs upon submission of search
  useEffect(() => {
    fetchJobs();
  }, [searchTerm]);
  

  // useCallback that will make API call to update application status of a job for the current user to 'applied'
  const applyToJob = useCallback(async (id) => {
      try {
        await JoblyApi.request(`jobs/${id}/apply`, {}, "post");
        fetchJobs();
      } catch (err) {
        console.log(err);
      }
  }, []);

  // ensure that jobsList and appliedJobs have both been set before passing them to each JobCard
  if (jobsList === null || appliedJobs === null) {
    return <div>...Loading</div>
  }

  return (
    <div className="Jobs">
      <Search setSearchTerm={setSearchTerm} />
        <div>
          {jobsList.map(jobData => (
            <JobCard key={jobData.id} jobData={jobData} appliedJobs={appliedJobs} applyToJob={applyToJob} />
          ))}
        </div>
    </div>
  )
}

export default Jobs;