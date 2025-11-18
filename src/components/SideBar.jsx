import React from "react";
import "./SideBar.css"
import { useRef, useEffect } from "react";
import SideBarCharityPop from "./SideBarCharityPop";"./SideBarCharityPop"



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
