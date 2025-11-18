import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import './MainMap.css'
import MiniDesc from "./MiniDesc"

const ImageMarker = (props) => (
    <div className="iconDiv" onClick={props.onClick}>
      <img 
        className="iconImage"
        src={props.img}
      />
    </div>
  );

function MainMap({ list, selected, onSelect }) {
    const [center, setCenter] = useState({ lat: 49.267535, lng: -123.128936 })
    const defaultProps = {
        center: {
          lat: 49.267535,
          lng: -123.128936
        },
        zoom: 13
      };
    const apiKey=import.meta.env.VITE_API_KEY

    const handleClick = ({lat, lng, item}) => {
        onSelect(item)
        setCenter({lat,lng})
    }

    return (
        <div className="mainContainer">
    


        <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={center}
        defaultZoom={defaultProps.zoom}
        >
        {list.map((item) => (
            <ImageMarker
            key={item.id}
            lat={item.lat}
            lng={item.lng}
            img={item.img}
            onClick={() => handleClick({ lat: item.lat, lng: item.lng, item })}
            />
        ))}

        {selected && (
            <MiniDesc
            name={selected.name}
            description={selected.description}
            onClose={() => onSelect(null)}
            lat={selected.lat}
            lng={selected.lng}
            img={selected.img}
            categories={selected.categories}
            needs={selected.needs}
            donatelink={selected.donatelink}
            applylink={selected.applylink}
            title={selected.title}
            />
        )}
        </GoogleMapReact>

        </div>
      );
    }

export default MainMap
