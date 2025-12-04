
import MainMap from "./MainMap.jsx"
import SideBar from "./SideBar.jsx"
import SignupLoginMain from "./SignupLogin.jsx";
import { useState, useEffect, useRef } from "react"
import "./MainMapApp.css"
import Logo from "../Logo/Logo.jsx"
import OrgView from "./OrgView.jsx";
import axios from "axios"
import haversineDistance from "../utils/haversineDistance.jsx";

function MainMapApp() {
    // charity selection
    const [selected, setSelected] = useState(null)

    // user location
    const [userLocation, setUserLocation] = useState({lat: 0, lng: 0})
    const userAllowedLocation = useRef(false)
   

    // database access
    const [charityData, setCharityData] = useState([])
    const [orgData, setOrgData] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            try {
                await fetch("http://localhost:2000/api/orgsWithJobs")
                    .then(res => 
                        res.json()
                    )
                    .then(data => {
                        setCharityData(data);
                    })  
            } catch (err) {
                console.err(err);
            }
        }   
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    userAllowedLocation.current = true
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation not supported by this browser.");
        }

        
        loadData() 
        
        const saved = localStorage.getItem("orgUser");
        if (saved) {
            setOrgData(JSON.parse(saved)[0]);  
            setLoggedIn(true)
        }
    }, [])

    function clear() {
        localStorage.clear()
        setOrgData([])
        setLoggedIn(false)
    }

    // category selection
    const [selectedCategory, setSelectedCategory] = useState("All postings")
    
    const categories= ["All postings"].concat(
        charityData && Array.isArray(charityData)
        ? [...new Set(charityData.map(item => item.org_category))] : [])

    const filteredCharities = charityData.filter((item) => {
        if (selectedCategory == null) {
            return true
        } else if (selectedCategory == "All postings") {
            return true
        } else {
            return item.org_category == selectedCategory
        }
    })

    // order selection
    const [selectedOrder, setSelectedOrder] = useState("None")

    const orderTypes = ["None", "Latest", "Organization", "Oldest"]

    if (userAllowedLocation) {
        orderTypes.push("Nearest")
    }

    const orderedCharities = filteredCharities.map(item => {
        const distance = haversineDistance(
            userLocation.lat,
            userLocation.lng,
            item.lat,
            item.lng
        )

        return { ...item, distance }
    })
    .sort((a, b) => {
        if (selectedOrder === "Nearest") {
            if (a.distance !== b.distance) return a.distance - b.distance;
            return new Date(a.posted_date) - new Date(b.posted_date);
        }

        if (selectedOrder === "Latest") {
            return new Date(b.posted_date) - new Date(a.posted_date);
        }

        if (selectedOrder === "Oldest") {
            return new Date(a.posted_date) - new Date(b.posted_date);
        }

        if (selectedOrder === "Organization") {
            return a.orgname.localeCompare(b.orgname)
        }
    })

    return (
    <div>
        <Logo/>
        
    <div className="mainmap">
        <SideBar list={orderedCharities} selected={selected} 
            onSelect={setSelected} onSelectCategory={setSelectedCategory}
            categories = {categories} selectCategory={selectedCategory}
            orderTypes={orderTypes} selectedOrder={selectedOrder}
            onSelectOrder={setSelectedOrder}
             />
        <MainMap 
        list={orderedCharities}
        selected={selected} 
        onSelect={setSelected}
        userAllowedLocation={userAllowedLocation}
        userLocation={userLocation}

        /> 
        
    </div>
    {loggedIn ?  <OrgView orgData={orgData} clear={clear}/> : <SignupLoginMain/>}

    </div>
  )
}

export default MainMapApp