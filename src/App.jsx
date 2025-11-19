import "./App.css";
import MainMap from "./components/MainMap.jsx"
import SideBar from "./components/SideBar.jsx"
import { useState } from "react"
import Charities from "./data/Charities.jsx"


function App() {
    const [selected, setSelected] = useState(null)

    const [selectedCategory, setSelectedCategory] = useState("View all")
    const categories = ["View all"].concat([...new Set(Charities.map(item => item.category))]);
    const filteredCharities = Charities.filter((item) => {
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