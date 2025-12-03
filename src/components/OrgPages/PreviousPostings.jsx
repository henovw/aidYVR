import "./PreviousPostings.css"
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

function PreviousPostings() {
    const orgID = useParams().id;

    const [data, setData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch("http://localhost:2000/api/org/previousposts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    organization_id: orgID
                })
            });
            const data = await res.json();
            setData(data)
            if (!res.ok) throw new Error(data.error || "Post failed");
            } catch (err) {
                console.error(err)
            }
        }
        loadData()
    }, [])
    
    
    return (
        <div>
            <Logo/>
            <div className="previous-posting-main">
                <div className="orgsignup-description">
            <h1>Your previous posts</h1>
            <span style={{"fontWeight": "normal"}}>View, edit, or delete any of the posts you've previously made.</span>
            </div>
            {data.map((item) => (
                <div className="previous-posting-individual" key={item.job_id}>
                    <h1>{item.title}</h1>
                    <p>{readableDate(item.posted_date)}</p>
                    <p>{item.address}</p>

                    <div className="previous-posting-individual-textbox-description">
                    <p>{item.job_description}</p>
                    {splitBySemicolon(item.jobneeds).map((need) => (
                        <span className="category">
                            {need}
                        </span>
                    ))}
                    {splitBySemicolon(item.categories).map((need) => (
                        <span className="category">
                            {need}
                        </span>
                    ))}
                    <p className="time">{item.daysperweek} day(s) per week</p>
                    <p className="time">{item.hourspershift} hour(s) per shift</p>
                    <p className="time">{item.termlength} term length</p>
                    </div>

                    <div className="previous-posting-individual-textbox-links">
                    <a href={item.applylink} target="_blank" className="apply">Application link</a>
                    <a href={item.donateylink} target="_blank" className="donate">Donation link</a>
                    </div>
                    
                </div>
            ))}

            </div>
        </div>
    )
}


export default PreviousPostings