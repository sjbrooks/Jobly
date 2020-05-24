import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './Company.css';

import JobCard from "./JobCard"
import JoblyApi from "./JoblyApi"


/** Company: Component renders profile page of single company, including company name, bio, and list of its job openings
 *    - Used in Routes
 *    - Uses JobCard component */

function Company() {
  const { handle } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(null);


  // defines fetchCompanyData, which makes API call for single company upon first component mount
  const fetchCompanyData = useCallback(async () => {
    try {
      let resp = await JoblyApi.getCompany(handle);
      setCompanyData(resp);

      let appliedJobsSet = new Set(resp.jobs.filter(j => j.state === 'applied').map(j => j.id));
      setAppliedJobs(appliedJobsSet);

    } catch (err) {
      console.log(err);
    }
  }, [handle]);

  // run fetchJobs upon mounting of Company component
  useEffect(() => {
    fetchCompanyData();
  }, []);

  // useCallback that will make API call to update application status of a job for the current user to 'applied'
  const applyToJob = useCallback(async (id) => {
    try {
      await JoblyApi.request(`jobs/${id}/apply`, {}, "post");
      fetchCompanyData();
    } catch (err) {
      console.log(err);
    }
  }, []);


  // ensure that jobsList and appliedJobs have both been set before passing them to each JobCard
  if (companyData === null || appliedJobs === null) {
    return <div>Loading...</div>
  }

  let jobCards = companyData.jobs.map(j => (
    <JobCard key={j.id} jobData={j} appliedJobs={appliedJobs} applyToJob={applyToJob} />
  ));

  return (
    <div className="Company">
      <div>
        <h3>{companyData.name}</h3>
        <p className="Company-description">{companyData.description}</p>
        {jobCards}
      </div>
    </div>
  )
}

export default Company;