import "./SignupLogin.css"
import { useNavigate } from "react-router-dom";


function SignupLoginMain() {
    const navigate = useNavigate();
    return (
        <div style={{"display": "flex"}}>
            
            {/* <div className="signinup-user-mainpage">
                <h1>Are you a volunteer?</h1>
                <span onClick={() => navigate("/user/signin")} className="user-signin-link">Sign into your account</span>
                <span onClick={() => navigate("/user/signup")} className="user-signup-link">Create an account</span>
            </div> */}

            
            <div className="signinup-org-mainpage">
                <h1>Are you with an organization?</h1>
                <span onClick={() => navigate("/org/signin")} className="org-signin-link">Sign into your account</span>
                <span onClick={() => navigate("/org/signup")} className="org-signup-link">Register your organization</span>
            </div>
        </div>
    )
}

export default SignupLoginMain