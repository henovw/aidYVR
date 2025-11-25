import "./MiniDesc.css"
import { useState, useEffect } from "react"

function MiniDesc(props) {
    const [orgCategories, setOrgCategories] = useState([]);
    const [jobNeeds, setJobNeeds] = useState([]);

    useEffect(() => {
        if (props.categories) {
            setOrgCategories(props.categories.split(";").filter(Boolean));
        }
        if (props.needs) {
            setJobNeeds(props.needs.split(";").filter(Boolean));
        }
    }, [props.categories, props.needs]); 

    return (
        <div>
            
        <div className="box">
            <div className="minidesc-image-exit">
        <button className="exit" onClick={props.onClose}><img src="src/assets/xbutton.svg"></img></button>
            <img className="minidesc-image" src={props.img}></img>
            </div>
            <h1 style={{"display": "flex", "text-align": "left", "margin-left": "5px"}}>{props.title}</h1>
            <br></br>
            <div className="categories-minidesc">
            
            {orgCategories.map(item => (
                <p className="category">{item}</p>
            ))}
            {jobNeeds.map(item => (
                <p className="need">{item}</p>
            ))}
            </div>
                <br></br>
            
            <div className="links-minidesc">
            <br></br>
            <a href={props.applylink} target="_blank">
            <button className="apply-minidesc">Apply</button>
            </a>

                <br></br>
            <a href={props.donatelink} target="_blank">
            <button className="link">Donate 🥰</button>
            </a>
            </div>

            
        </div>
        </div>
    )
}

export default MiniDesc