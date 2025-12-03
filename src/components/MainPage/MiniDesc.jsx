import "./MiniDesc.css"
import { useState, useEffect } from "react"

function MiniDesc({ onClose, img, categories, needs, donatelink, applylink, title}) {
    const [orgCategories, setOrgCategories] = useState([]);
    const [jobNeeds, setJobNeeds] = useState([]);

    useEffect(() => {
        if (categories) {
            setOrgCategories(categories.split(";").filter(Boolean));
        }
        if (needs) {
            setJobNeeds(needs.split(";").filter(Boolean));
        }
    }, [categories, needs]); 

    return (
        <div>
            
        <div className="box">
            <div className="minidesc-image-exit">
        <button className="exit" onClick={onClose}><img src="src/assets/xbutton.svg"></img></button>
            <img className="minidesc-image" src={img}></img>
            </div>
            <h1 style={{"display": "flex", "textAlign": "left", "marginLeft": "5px"}}>{title}</h1>
            <br></br>
            <div className="categories-minidesc">
            
            {orgCategories.map(item => (
                <p key={item} className="category">{item}</p>
            ))}
            {jobNeeds.map(item => (
                <p key={item} className="need">{item}</p>
            ))}
            </div>
                <br></br>
            
            <div className="links-minidesc">
            <br></br>
            <a href={applylink} target="_blank">
            <button className="apply-minidesc">Apply</button>
            </a>

                <br></br>
            <a href={donatelink} target="_blank">
            <button className="link">Donate 🥰</button>
            </a>
            </div>

            
        </div>
        </div>
    )
}

export default MiniDesc