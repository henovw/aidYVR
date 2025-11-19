import React from "react";
import "./SideBar.css"
import { useRef, useEffect } from "react";
import SideBarCharityPop from "./SideBarCharityPop"
import SearchBar from "./SearchBar"



function SideBar(props) {

  return (
    <div className="main">
        <SearchBar 
            onSelectCategory={props.onSelectCategory}
            categories={props.categories}
            selectCategory={props.selectCategory}
        />
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
