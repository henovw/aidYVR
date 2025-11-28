import { useState, useEffect } from "react"
import "./OrgView.css"
import { useNavigate } from "react-router-dom";

function OrgView({ orgData, clear }) {

    const navigate = useNavigate()

    return (
        <div className="orgview-main">
            <div className="orgview-image-title">
            <img className="orgview-image" src={orgData.logo}/>
            <h1 className="orgview-title">{orgData.orgname}</h1>
            </div>
            
            <button onClick={() => navigate("/org/post")} className="orgview-post">Post an opportunity 🥹</button>
            <button onClick={clear} className="orgview-logout">Logout</button>
            
        </div>
    )
} 

export default OrgView