import "./OrgMainPage.css"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom" 
import Logo from "../Logo/Logo.jsx"

function readableDate(props) {
    return new Date(props).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function splitBySemicolon(props) {
    return props.split(";")
}

function OrgMainPage() {
    const orgID = useParams().id;

    const [postData, setPostData] = useState([])
    const [orgData, setOrgData] = useState([])
    const loadPostData = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/org/previousposts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                organization_id: orgID
            })
        });
        const data = await res.json();
        setPostData(data)
        if (!res.ok) throw new Error(data.error || "Post failed");
        } catch (err) {
            console.error(err)
        }
    }

    const loadOrgData = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/org/details", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: orgID
                })
            })
            const data = await res.json()
            setOrgData(data)
            console.log(data)
            if (!res.ok) throw new Error(data.error)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadOrgData()
        loadPostData()
    }, [])

    const deletePost = async (item) => {
        if (!confirm("Are you sure you want to delete this post?")) {
            loadData()
            return
        }
        try {
            const res = await fetch("http://localhost:2000/api/org/deletepost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    job_id: item.job_id
                })
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Delete failed");
            }
           loadData()
        } catch (err) {
            console.error(err)
        }
    }
    
    
    return (
        <div>
            <Logo/>
            

            <div className="previous-posting-main">

            <div className="orgsignup-description">
            <h1>Your Organization</h1>
            <span style={{"fontWeight": "normal"}}>View or edit your organization data.</span>
            </div>

            <div className="orgmainpage-org-div">
            <h1>{orgData.orgname}</h1>
            <p>{orgData.email}</p>
            <img src={orgData.logo}></img>
           
            <div className="orgmain-textbox-description">
            <span>{orgData.description}</span>
            <br></br>
            <span className="orgmainpage-org-category">{orgData.category}</span>
            </div>
            <div className="previous-posting-buttons"> 
            <button 
            className="previous-posting-buttons-edit">Edit</button>
            </div>
            </div>




            <div className="orgsignup-description">
            <h1>Your previous posts</h1>
            <span style={{"fontWeight": "normal"}}>View, edit, or delete any of the posts you've previously made.</span>
            </div>
            {postData.map((item) => (
                <div className="previous-posting-individual" key={item.job_id}>
                    <h1>{item.title}</h1>
                    <p>{readableDate(item.posted_date)}</p>
                    <p>{item.address}</p>

                    <div className="previous-posting-individual-textbox-description">
                    <p>{item.job_description}</p>
                    {splitBySemicolon(item.jobneeds).map((need) => (
                        <span className="category" key={need}>
                            {need}
                        </span>
                    ))}
                    {splitBySemicolon(item.categories).map((need) => (
                        <span className="category" key={need}>
                            {need}
                        </span>
                    ))}
                    <p className="time">{item.daysperweek} day(s) per week</p>
                    <p className="time">{item.hourspershift} hour(s) per shift</p>
                    <p className="time">{item.termlength} term length</p>
                    </div>

                    <div className="previous-posting-individual-textbox-links">
                    <a href={item.applylink} target="_blank" className="apply">Application link</a>
                    </div>
                    
                    <div className="previous-posting-buttons"> 

                    <button 
                    className="previous-posting-buttons-edit">Edit</button>
                    <button 
                    onClick={() => deletePost(item)}
                    className="previous-posting-buttons-delete">Delete</button>
                    </div>
                </div>
            ))}
            <Link to={`/org/post/new/${orgID}`}>
            <button className="previous-posting-new-post">
            <h1>Make a new post! 🤩</h1>
            </button>
            </Link>

            </div>
        </div>
    )
}


export default OrgMainPage