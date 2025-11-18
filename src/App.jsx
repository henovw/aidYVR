import "./App.css";
import MainMap from "./components/MainMap.jsx"
import SideBar from "./components/SideBar.jsx"
import { useState } from "react"
import data from "./data/Charities.jsx"


function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
        <div className="maintitle">
            <h1>LendAHand</h1>
            <h2>volunteering-opportunities</h2>
        </div>

    <div className="app">
      <SideBar list={data} selected={selected} onSelect={setSelected} />
      <MainMap list={data} selected={selected} onSelect={setSelected} />
    </div>
    </div>
  )
}

export default App