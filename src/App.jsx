import "./App.css";
import MainMapApp from "./components/MainPage/MainMapApp.jsx"
import UserSignin from "./components/UserSigninup/UserSignin.jsx"
import UserSignup from "./components/UserSigninup/UserSignup.jsx"
import OrgSignin from "./components/OrgSigninup/OrgSignin.jsx"
import OrgSignup from "./components/OrgSigninup/OrgSignup.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrgMainPage from "./components/OrgPages/OrgMainPage.jsx";
import OrgPosting from "./components/OrgPages/OrgPosting.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // runs on route change

  return null;
}

function App() {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0)
    }
    return (
    <Router>
        <Routes>
            <Route path="/" element={<MainMapApp/>} />
            {/* user signin and signup */}
                <Route path="/user/signin" element={<UserSignin/>} />
                <Route path="/user/signup" element={<UserSignup/>} />
            {/* organization signin and signup */}
                <Route path="/org/signin" element={<OrgSignin/>} />
                <Route path="/org/signup" element={<OrgSignup/>} />
            {/* organization main page */}
                <Route path="/org/main" element={<OrgMainPage/>} />
            {/* organization post screen */}
                <Route path="/org/post" element={<OrgPosting/>}/>

        </Routes>
    </Router>
  )
}

export default App