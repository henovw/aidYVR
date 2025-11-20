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
            selectItem={props.onSelect}
        />
      {props.list.map((item) => (
        <SideBarCharityPop
          item={item}
          onClick={() => props.onSelect(item)}
          isSelected={props.selected?.title === item.title}
          key={item.job_id}
        />
      ))}
    </div>
  );
}

export default SideBar;
