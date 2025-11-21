import "./SignupLoginMain.css"


function SignupLoginMain() {
    return (
        <div>
            <h1>Volunteer</h1>
            <div className="signinup-user-mainpage">
                <span>Do you have an account?</span>
                <span>Do you want to sign-up?</span>
            </div>

            <h1>Organization</h1>
            <div className="signinup-org-mainpage">
                <span>Are you with an organization?</span>
                <span>Do you want to register an organization?</span>
            </div>
        </div>
    )
}

export default SignupLoginMain