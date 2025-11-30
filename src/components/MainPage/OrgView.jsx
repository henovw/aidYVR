import { useState, useEffect } from "react"
import "./OrgView.css"
import { Link } from "react-router-dom" 

function OrgView({ orgData, clear }) {


    return (
        <div className="orgview-main">
            <div className="orgview-image-title">
            <img className="orgview-image" src={orgData.logo}/>
            <h1 className="orgview-title">{orgData.orgname}</h1>
            </div>
            <Link to={`/org/post/new/${orgData.id}`}>
            <button className="orgview-post">Post an opportunity 🥹</button>
            </Link>
            <Link to={`/org/post/previous/${orgData.id}`}>
            <button className="orgview-previous-posts">View posted opportunities</button>
            </Link>
            <button onClick={clear} className="orgview-logout">Logout</button>
            
        </div>
    )
} 

export default OrgView