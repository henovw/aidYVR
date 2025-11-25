import "./Logo.css"
import { useNavigate } from "react-router-dom"

function Logo() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="maintitle" onClick={() => navigate("/")}>
            <h1>aidYVR</h1>
            <h2>volunteering-opportunities-vancouver</h2>
            </div>
        </div>
    )
}

export default Logo