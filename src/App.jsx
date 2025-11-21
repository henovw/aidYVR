import "./App.css";
import MainMap from "./components/MainPage/MainMap.jsx"
import SideBar from "./components/MainPage/SideBar.jsx"
import SignupLoginMain from "./components/MainPage/SignupLoginMain.jsx";
import { useState, useEffect } from "react"
import Charities from "./data/Charities.jsx"

function App() {
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
        <div className="maintitle">
            <h1>aidYVR</h1>
            <h2>volunteering-opportunities-vancouver</h2>
        </div>
        
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

export default App