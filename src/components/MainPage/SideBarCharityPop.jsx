

import "./SideBar.css"
import React, { useRef, useEffect, useState } from "react";

function SideBarCharityPop({ item, onClick, isSelected }) {
    const ref = useRef(null)

    useEffect(() => {
    if (isSelected && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    }, [isSelected])

    const [orgCategories, setOrgCategories] = useState([]);
    const [jobNeeds, setJobNeeds] = useState([]);

    const datePosted = new Date(item.posted_date).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        if (item.org_categories) {
            setOrgCategories(item.org_categories.split(";").filter(Boolean));
        }
        if (item.jobneeds) {
            setJobNeeds(item.jobneeds.split(";").filter(Boolean));
        }
    }, [item.org_categories, item.jobneeds]); 

    return (
  <div
    key={item.job_id}
    ref={ref}
    className={`charity ${isSelected ? "selected-sidebar" : ""}`}
    onClick={onClick}>
        
    <div className="titlecard">
    <img className="image" src={item.logo} />
    <div className="titleDescription">
    <h2>{item.title}</h2>
    <h3>{item.orgname}</h3>
    
    <p className="descriptor">{item.org_category}</p>
    <div className="categories-sidebar">
      {orgCategories.map((cat) => (
        <p className="categorya" key={cat}>{cat}</p>
      ))}
      </div>
      </div>
    </div>

    <h3>Opportunity description:</h3>
    <p className="description">{item.job_description}</p>

    <h3>Shift hours:</h3>
    <div className="categories-sidebar">
        <p className="time">Days per week: {item.daysperweek}</p>
        <p className="time">Hours per shift: {item.hourspershift}</p>
        <p className="time">Term length: {item.termlength}</p>
    </div>

    <h3>About us:</h3>
    <p className="description">{item.org_description}</p>


    <h3>What you bring:</h3>
    <div className="categories-sidebar">
      {jobNeeds.map((need) => (
        <p className="needs" key={need}>{need}</p>
      ))}
    </div>
      <div className="links">
      <br></br>
      <a href={item.applylink} target="_blank">
        <button className="apply">Apply</button>
      </a>

    <br></br>
            <a href={item.donatelink} target="_blank">
            <button className="donate">Donate 🥰</button>
            </a>
            <p>Posted {datePosted}</p>
            </div>
  </div>
    )
}
export default SideBarCharityPop