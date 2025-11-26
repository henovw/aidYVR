import { useState, useEffect } from "react"
import "./OrgView.css"

function OrgView({ orgData, clear }) {
    console.log(orgData)
    return (
        <div className="orgview-main">
            <div className="orgview-image-title">
            <img className="orgview-image" src={orgData.logo}/>
            <h1 className="orgview-title">{orgData.orgname}</h1>
            </div>
            
            <button className="orgview-post">Post an opportunity 🥹</button>
            <button onClick={clear} className="orgview-logout">Logout</button>
            
        </div>
    )
} 

export default OrgView