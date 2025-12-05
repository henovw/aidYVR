import "./App.css";
import MainMapApp from "./components/MapMainPage/MainMapApp.jsx"
import UserSignin from "./components/UserSigninup/UserSignin.jsx"
import UserSignup from "./components/UserSigninup/UserSignup.jsx"
import OrgSignin from "./components/OrgSigninup/OrgSignin.jsx"
import OrgSignup from "./components/OrgSigninup/OrgSignup.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import OrgPosting from "./components/OrgPages/OrgPosting.jsx";
import OrgMainPage from "./components/OrgPages/OrgMainPage.jsx"



function App() {
    
    return (
    <Routes>
        {/* map page - current website landing */}
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
        {/* organization post screen */}
            <Route path="post/new/:id" element={<OrgPosting/>}/>
        {/* organization view postings */}
            <Route path="main/:id" element={<OrgMainPage />}/>
        </Route>
        
    </Routes>
  )
}

export default App