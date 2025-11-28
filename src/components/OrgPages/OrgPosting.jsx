import Logo from "../Logo/Logo.jsx"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import "./OrgPosting.css"
import GoogleMapReact from 'google-map-react';

function OrgPosting() {
    const [form, setForm] = useState({
    title: "",
    description: "",
    daysperweek: "",
    hourspershift: "",
    termlength: "",
    applylink: "",
    jobneeds: "",
    lat: 0,
    lng: 0,
    categories: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const orgID = JSON.parse(localStorage.getItem("orgUser"))[0].id


    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.categories) {
        setError("All fields are required.");
        return;
    }
    setLoading(true);

    try {
        const res = await fetch("http://localhost:2000/api/org/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                organization_id: orgID,
                title: form.title,
                description: form.description,
                daysperweek: form.daysperweek,
                hourspershift: form.hourspershift,
                termlength: form.termlength,
                applylink: form.applylink,
                jobneeds: form.jobneeds,
                lat: form.lat,
                lng: form.lng,
                categories: form.categories
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Post failed");
        navigate("/")
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  }

    return (
        <div>
            <Logo/>
            
        <div className="orgpost-main">
            <div className="orgsignup-description">
            <h1>Make an opportunity posting</h1> 
            <h2>Post your opportunity to aidYVR and let thousands of active users help you. Enter the job description and data to get started.</h2>
            <span>aidYVR has found over 100 local organizations amazing volunteers. 
                By making a posting with us, you are allowing thousands of applicants to view your positions
                and help make the world a better place.
            </span>
        </div>
        <form onSubmit={onSubmit} className="orgpost-form">
            
            {error && <div className="error-msg-org-signup">Error: {error}</div>}
            <span>Position title
            <input name="title" className="input-orgpost" value={form.title} onChange={onChange}/>
            </span>
            <span>Job description (100 word max)
            <textarea name="description" className="input-orgpost-description" value={form.description} onChange={onChange} type="email" />
            </span>
            <span>Job requirements (separate with ;)
            <textarea name="jobneeds" className="input-orgpost" value={form.jobneeds} onChange={onChange}/>
            </span>
            <span>Job tags (separate with ;)
            <textarea name="categories" className="input-orgpost" value={form.categories} onChange={onChange}/>
            </span>
            <span>Hours per shift (can be a range)
            <input name="hourspershift" className="input-orgpost" value={form.hourspershift} onChange={onChange} />
            </span>
            <span>Days per week (can be a range)
            <input name="daysperweek" className="input-orgpost" value={form.daysperweek} onChange={onChange} />
            </span>
            <span>Term length
            <input name="termlength" className="input-orgpost" value={form.termlength} onChange={onChange} />
            </span>

            <span>Latitude of main location
            <input name="lat" className="input-orgpost" value={form.lat} onChange={onChange} type="number" />
            </span>
            <span>Longitude of main location
            <input name="lng" className="input-orgpost" value={form.lng} onChange={onChange} type="number" />
            </span>


            
            <span>Application link
            <input name="applylink" className="input-orgpost" value={form.applylink} onChange={onChange} />
            </span>

            <button className="orgpost-submit" type="submit" disabled={loading}>{loading ? "Posting..." : "Post! 🤩"}</button>
            </form>
        </div>
        </div>
    )
}

export default OrgPosting