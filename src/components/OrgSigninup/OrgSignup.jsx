import React, {useState} from "react";
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
    lat: "",
    lng: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  function onChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const mainCategories = [
    "Medical support", "Medical research", "Social support", "Food security", "Child care"
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
          orgName: form.orgname,
          email: form.email,
          password: form.password,
          category: form.category,
          donatelink: form.donatelink, 
          description: form.description,
          lat: form.lat || null,
          lng: form.lng || null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      alert("Organization created!");
      useNavigate()
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="org-signup">
        <h2>Organization Signup</h2>
        {error && <div style={{color:"red"}}>{error}</div>}
        <span>Organization name
        <input name="orgname" value={form.orgname} onChange={onChange}/>
        </span>
        <span>Email
        <input name="email" value={form.email} onChange={onChange} type="email" />
        </span>
        <span>Password
        <input name="password" value={form.password} onChange={onChange} type="password" />
        </span>
        <span>Confirm password
        <input name="confirmPassword" value={form.confirmPassword} onChange={onChange} type="password" />
        </span>
        <span>Main category
        <select name="category" value={form.category} onChange={onChange} >
        {mainCategories.map((item) => (
            <option key={item}>{item}</option>
        ))}
        </select>
        </span>
        <span>Donation link
        <input name="donatelink" value={form.donatelink} onChange={onChange} />
        </span>
        <span>Description of your organization (200 words max)
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" />
        </span>
        <span>Latitude of your main office
        <input name="lat" value={form.lat} onChange={onChange} placeholder="Latitude" />
        </span>
        <span>Longitude of your main office
        <input name="lng" value={form.lng} onChange={onChange} placeholder="Longitude" />
        </span>
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up"}</button>
    </form>
  );
}

export default OrgSignup