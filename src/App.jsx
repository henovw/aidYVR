import "./App.css";
import MainMap from "./components/MainMap.jsx"
import SideBar from "./components/SideBar.jsx"
import { useState, useEffect } from "react"
import Charities from "./data/Charities.jsx"

function App() {
    // charity selection
    const [selected, setSelected] = useState(null)


    // database access
    const [charityData, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([])

    useEffect(() => {
        fetch("http://localhost:2000/api/charities")
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
    const categories = ["View all"].concat([...new Set(charityData.map(item => item.category))])
    const filteredCharities = charityData.filter((item) => {
        if (selectedCategory == null) {
            return true
        } else if (selectedCategory == "View all") {
            return true
        } else {
            return item.category == selectedCategory
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
            categories = {categories} selectCategory={selectedCategory} />
        <MainMap list={filteredCharities} selected={selected} onSelect={setSelected} />
    </div>
    </div>
  )
}

export default App