import React, {useState} from "react";
import Logo from "../Logo/Logo.jsx"
import { useNavigate } from "react-router-dom";
import "./OrgSignup.css"


function OrgSignup() {
  const [form, setForm] = useState({
    orgname: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    donatelink: "", 
    description: "",
    logo: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  function onChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const mainCategories = [
    "Medical support", "Medical research", "Social support", "Food security", "Child care",
    "Animal support"
  ]

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.orgname) {
      setError("Org name, email and password are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:2000/api/org/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgname: form.orgname,
          email: form.email,
          password: form.password,
          category: form.category,
          donatelink: form.donatelink, 
          description: form.description,
          logo: form.logo
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      alert("Organization created!");
      navigate("/")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div><Logo/>
    
    <div className="orgsignup-main">
    <div className="orgsignup-description">
        <h1 className="orgsignup-title">Register your Organization</h1> 
        <h2>Register your organization with aidYVR and start making job postings to attract the best applicants in Canada.</h2>
        <span>aidYVR has found over 100 local organizations amazing volunteers. 
            By registering your organization with us, you are allowing thousands of applicants to view your positions
            and help make the world a better place.
        </span>
    </div>
    <form onSubmit={onSubmit} className="org-signup">
        
        {error && <div className="error-msg-org-signup">Error: {error}</div>}
        <span>Organization name
        <input name="orgname" className="input-orgsignup" value={form.orgname} onChange={onChange}/>
        </span>
        <span>Email
        <input name="email" className="input-orgsignup" value={form.email} onChange={onChange} type="email" />
        </span>
        <span>Password
        <input name="password" className="input-orgsignup" value={form.password} onChange={onChange} type="password" />
        </span>
        <span>Confirm password
        <input name="confirmPassword" className="input-orgsignup" value={form.confirmPassword} onChange={onChange} type="password" />
        </span>
        <span>Main category
        <select className="select-orgsignup" name="category" value={form.category} onChange={onChange} >
        {mainCategories.map((item) => (
            <option key={item}>{item}</option>
        ))}
        </select>
        </span>
        <span>Donation link
        <input name="donatelink" className="input-orgsignup" value={form.donatelink} onChange={onChange} />
        </span>

        <span>Description of your organization (200 words max)
        <textarea name="description"  className="input-orgsignup-description"value={form.description} onChange={onChange} />
        </span>

        <span>Logo of your organization (link)
        <input name="logo" className="input-orgsignup" value={form.logo} onChange={onChange}/>
        </span>

        <button className="orgsignup-submit" type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up! 🥳"}</button>
    </form>
    </div>
    </div>
  );
}

export default OrgSignup