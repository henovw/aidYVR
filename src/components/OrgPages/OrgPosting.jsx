import Logo from "../Logo/Logo.jsx"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import "./OrgPosting.css"
import GoogleMapReact from 'google-map-react';
import getAddress from "../utils/geocode.jsx"

const ImageMarker = (props) => (
    <div className="iconDiv">
      <img 
        className="iconImage"
        src={props.logo}
      />
    </div>
  );

function OrgPosting() {
    const [form, setForm] = useState({
    title: "",
    daysperweek: "",
    hourspershift: "",
    termlength: "",
    applylink: "",
    jobneeds: "",
    categories: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const orgID = JSON.parse(localStorage.getItem("orgUser"))[0].id

    const [address, setAddress] = useState("")

    function onChangeAddress(e) { setAddress(e.target.value) }

    const [lat, setLat] = useState(49.267535)
    const [lng, setLng] = useState(-123.128936)
    

    const getGeocodeAddress = async (e) => {
        e.preventDefault();
        try {
            const { lat, lng } = await getAddress(address)
            setLat(lat);
            setLng(lng)
        } catch (err) {
            setError(err.message)
        }
    }

    const [description, setDescription] = useState("")
    const [charRemaining, setCharRemaining] = useState(200)

    function onChangeDescription(e) {
        if (e.target.value.length <= 200) {
            setDescription(e.target.value)
            setCharRemaining(200 - e.target.value.length)
        }
    }
    
    const apiKey=import.meta.env.VITE_API_KEY

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const logo = JSON.parse(localStorage.getItem("orgUser"))[0].logo

    async function onSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.title || !form.categories) {
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
                    description: description,
                    daysperweek: form.daysperweek,
                    hourspershift: form.hourspershift,
                    termlength: form.termlength,
                    applylink: form.applylink,
                    jobneeds: form.jobneeds,
                    lat: lat,
                    lng: lng,
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
            <span>Job description (200 character max)
            <textarea name="description" className="input-orgpost-description" value={description} onChange={onChangeDescription} type="email" />
            <p style={{"font-weight": "normal"}}>{charRemaining} characters remaining</p>
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
            <span>Location of opportunity
            <div className="map-orgpost">
            <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            center={{lat: lat, lng: lng}}
            defaultZoom={12.4}
            >

                <ImageMarker logo={logo} address={address}/>
            </GoogleMapReact>
            </div>
            <input name="address" className="input-orgpost-map" value={address} onChange={onChangeAddress} type="address"/>
            <button onClick={getGeocodeAddress} type="submit" className="orgpost-submit-address">Check address</button>
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