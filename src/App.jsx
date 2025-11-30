import "./App.css";
import MainMapApp from "./components/MainPage/MainMapApp.jsx"
import UserSignin from "./components/UserSigninup/UserSignin.jsx"
import UserSignup from "./components/UserSigninup/UserSignup.jsx"
import OrgSignin from "./components/OrgSigninup/OrgSignin.jsx"
import OrgSignup from "./components/OrgSigninup/OrgSignup.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import OrgMainPage from "./components/OrgPages/OrgMainPage.jsx";
import OrgPosting from "./components/OrgPages/OrgPosting.jsx";
import PreviousPostings from "./components/OrgPages/PreviousPostings.jsx"



function App() {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0)
    }
    return (
    <Routes>
        <Route path="/" element={<MainMapApp/>} />
        {/* user signin and signup */}
        <Route path="/user">
            <Route path="signin" element={<UserSignin/>} />
            <Route path="signup" element={<UserSignup/>} />
        </Route>

        {/* organization */}
        <Route path="/org">
        {/* organization signin and signup */}
            <Route path="signin" element={<OrgSignin/>} />
            <Route path="signup" element={<OrgSignup/>} />
        {/* organization main page */}
            <Route path="main" element={<OrgMainPage/>} />
        {/* organization post screen */}
            <Route path="post/new/:id" element={<OrgPosting/>}/>
        {/* organization view postings */}
            <Route path="post/previous/:id" element={<PreviousPostings />}/>
        </Route>
        
    </Routes>
  )
}

export default App