import "./App.css";
import MainMapApp from "./components/MainPage/MainMapApp.jsx"
import UserSignin from "./components/UserSigninup/UserSignin.jsx"
import UserSignup from "./components/UserSigninup/UserSignup.jsx"
import OrgSignin from "./components/OrgSigninup/OrgSignin.jsx"
import OrgSignup from "./components/OrgSigninup/OrgSignup.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
    return (
    <Router>
        <Routes>
            <Route path="/" element={<MainMapApp/>} />
            {/* user signin and signup */}
                <Route path="/user-signin" element={<UserSignin/>} />
                <Route path="/user-signup" element={<UserSignup/>} />
            {/* organization signin and signup */}
                <Route path="/org-signin" element={<OrgSignin/>} />
                <Route path="/org-signup" element={<OrgSignup/>} />

        </Routes>
    </Router>
  )
}

export default App