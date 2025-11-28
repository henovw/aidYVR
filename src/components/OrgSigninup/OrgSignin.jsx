import React, {useState} from "react";
import Logo from "../Logo/Logo.jsx"
import { useNavigate } from "react-router-dom";
import "./OrgSignup.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function OrgSignin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  function onChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }
  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.password || !form.email) {
      setError("Email and password are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:2000/api/org/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signin failed");
      localStorage.setItem("orgUser", JSON.stringify(data))
      navigate("/")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
    <Logo/>
    
    <div className="orgsignup-main">
    <div className="orgsignup-description">
        <h1 className="orgsignup-title">Sign in to your organization</h1> 
        
    </div>
    <form onSubmit={onSubmit} className="org-signup">
        
        {error && <div className="error-msg-org-signup">Error: {error}</div>}
        <span>Email
        <input name="email" className="input-orgsignup" value={form.email} onChange={onChange} type="email" />
        </span>
        <span>Password
        <input name="password" className="input-orgsignup" value={form.password} onChange={onChange} type="password" />
        </span>
        <span>Confirm password
        <input name="confirmPassword" className="input-orgsignup" value={form.confirmPassword} onChange={onChange} type="password" />
        </span>
        <button className="orgsignup-submit" type="submit" disabled={loading}>{loading ? "Creating..." : "Sign in!"}</button>
    </form>

    </div>

    </div>
  );
}

export default OrgSignin