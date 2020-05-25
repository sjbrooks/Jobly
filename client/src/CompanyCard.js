/** CompanyCard: Presentational component that renders a linked div with company info
 *    - Holds props of a single companyData object
 *    - Used in Companies component */


import React from 'react';
import './CompanyCard.css';
import { Link } from "react-router-dom";


function CompanyCard({ companyData }) {
  return (
    <div className="company-card">
      <Link to={`/companies/${companyData.handle}`}>
        <span className="company-card-link"></span>
      </Link>
      <h5>{companyData.name}</h5>
      <p>{companyData.description}</p>
      <img src={companyData.logo_url} alt="company_pic"></img>
    </div>
  )
}

export default CompanyCard;