/** Companies: Component that renders a search bar and list of companies
 *    - Holds state of searchTerm and companiesList
 *    - Used in Routes
 *    - Uses Search and CompanyCard components */


import React, { useEffect, useState } from 'react';
import './Companies.css';
import JoblyApi from "../api/JoblyApi";

import CompanyCard from "./CompanyCard"
import Search from "../shared/Search"
import LoadingSpinner from '../shared/LoadingSpinner';


function Companies() {

  const [searchTerm, setSearchTerm] = useState("");
  const [companiesList, setCompaniesList] = useState(null);

  /* useEffect that will make API call for filtered companies upon change in searchTerm */

  useEffect(() => {
    async function fetchCompanies() {
      try {
        let resp = await JoblyApi.request(`companies?search=${searchTerm}`);
        setCompaniesList(resp.companies);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCompanies();
  }, [searchTerm]);


  /* Ensure that companiesList has been set before passing them to each CompanyCard */

  if (companiesList === null) {
    return <LoadingSpinner />
  }

  const companyCards = companiesList.map(companyData => (
    <CompanyCard key={companyData.handle} companyData={companyData} />
  ))


  return (
    <div className="Companies">
      <Search setSearchTerm={setSearchTerm} />
      <div>
        {companyCards.length > 0 ? companyCards : <h4>{`No companies found for "${searchTerm}."`}</h4>}
      </div>
    </div>
  )
}

export default Companies;