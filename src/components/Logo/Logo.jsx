import { Link } from "react-router-dom"
import "./Logo.css"

function Logo() {
    return (
        <div>
            <Link to="/">
            <div className="maintitle">
            <h1>aidYVR</h1>
            <h2>volunteering-opportunities-vancouver</h2>
            </div>
            </Link>
        </div>
    )
}

export default Logo