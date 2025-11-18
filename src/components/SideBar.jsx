import React from "react";
import "./SideBar.css"

const SideBarCharityPop = ({ item, onClick, isSelected }) => (
  <div
    className={`charity ${isSelected ? "selected" : ""}`}
    onClick={onClick}
  >
    <div className="titlecard">
    <img className="image" src={item.img} />
    <div className="titleDescription">
    <h2>{item.name}</h2>
    
    <p className="descriptor">{item.category}</p>
    <div className="categories">
      {item.categories.map((cat) => (
        <p className="categorya" key={cat}>{cat}</p>
      ))}
      </div>
      </div>
    </div>

    <h3>About us:</h3>
    <p className="description">{item.longDescription}</p>


    <h3>We need:</h3>
    <div className="categories">
      {item.needs.map((need) => (
        <p className="needs" key={need}>{need}</p>
      ))}
    </div>

    <br></br>
            <a href={item.donatelink} target="_blank">
            <button className="link">Donate 🥰</button>
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
