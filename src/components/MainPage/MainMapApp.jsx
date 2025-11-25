
import MainMap from "./MainMap.jsx"
import SideBar from "./SideBar.jsx"
import SignupLoginMain from "./SignupLogin.jsx";
import { useState, useEffect } from "react"
import "./MainMapApp.css"
import Logo from "../Logo/Logo.jsx"

function MainMapApp() {
    // charity selection
    const [selected, setSelected] = useState(null)


    // database access
    const [charityData, setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:2000/api/orgsWithJobs")
            .then(res => 
                res.json()
            )
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(err => console.error(err))       
    }, [])


    // category selection
    const [selectedCategory, setSelectedCategory] = useState("View all")
    
    const categories= ["View all"].concat(
        charityData && Array.isArray(charityData)
        ? [...new Set(charityData.map(item => item.org_category))] : [])

    const filteredCharities = charityData.filter((item) => {
        if (selectedCategory == null) {
            return true
        } else if (selectedCategory == "View all") {
            return true
        } else {
            return item.org_category == selectedCategory
        }
    })
    return (
    <div>
        <Logo/>
        
    <div className="mainmap">
        <SideBar list={filteredCharities} selected={selected} 
            onSelect={setSelected} onSelectCategory={setSelectedCategory}
            categories = {categories} selectCategory={selectedCategory}
             />
        <MainMap list={filteredCharities} selected={selected} onSelect={setSelected} />
    </div>
    <SignupLoginMain/>

    </div>
  )
}

export default MainMapApp