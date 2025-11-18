import React from "react";
import "./SideBar.css"
import { useRef, useEffect } from "react";

const SideBarCharityPop = ({ item, onClick, isSelected }) => (
  <div
    className={`charity ${isSelected ? "selected" : ""}`}
    onClick={onClick}
  >
    <div className="titlecard">
    <img className="image" src={item.img} />
    <div className="titleDescription">
    <h2>{item.title}</h2>
    <h3>{item.name}</h3>
    
    <p className="descriptor">{item.category}</p>
    <div className="categories">
      {item.categories.map((cat) => (
        <p className="categorya" key={cat}>{cat}</p>
      ))}
      </div>
      </div>
    </div>

    <h3>Opportunity description:</h3>
    <p className="description">{item.description}</p>

    <h3>Shift hours:</h3>
    <div className="categories">
        <p className="time">Days per week: {item.daysPerWeek}</p>
        <p className="time">Hours per shift: {item.hoursPerShift}</p>
        <p className="time">Term length: {item.termLength}</p>
    </div>

    <h3>About us:</h3>
    <p className="description">{item.longDescription}</p>


    <h3>What you bring:</h3>
    <div className="categories">
      {item.needs.map((need) => (
        <p className="needs" key={need}>{need}</p>
      ))}
    </div>

      <br></br>
      <a href={item.applylink} target="_blank">
        <button className="apply">Apply</button>
      </a>

    <br></br>
            <a href={item.donatelink} target="_blank">
            <button className="donate">Donate 🥰</button>
            </a>
  </div>
);

function SideBar(props) {
  return (
    <div className="main">
      {props.list.map((item) => (
        <SideBarCharityPop
          item={item}
          onClick={() => props.onSelect(item)}
          isSelected={props.selected?.name === item.name}
        />
      ))}
    </div>
  );
}

export default SideBar;
