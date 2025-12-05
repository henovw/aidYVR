import "./SignupLogin.css"
import { Link } from "react-router-dom" 

function SignupLoginMain() {
    return (
        <div style={{"display": "flex"}}>
            
            <div className="signinup-user-mainpage">
                <h1>Are you a volunteer?</h1>
                <Link to="/user/signin">
                <span className="org-signin-link">Sign in to your account</span>
                </Link>
                <Link to="/user/signup">
                <span className="org-signup-link">Create an account</span>
                </Link>
            </div>
            
            <div className="signinup-org-mainpage">
                <h1>Are you with an organization?</h1>
                <Link to="/org/signin">
                <span className="org-signin-link">Sign in to your account</span>
                </Link>
                <Link to="/org/signup">
                <span className="org-signup-link">Register your organization</span>
                </Link>
            </div>

        </div>
    )
}

export default SignupLoginMain