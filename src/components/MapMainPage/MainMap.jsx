import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from 'google-map-react';
import './MainMap.css'
import MiniDesc from "./MiniDesc"
import axios from "axios"

const ImageMarker = ({onClick, logo}) => (
    <div className="iconDiv" onClick={onClick}>
      <img 
        className="iconImage"
        src={logo}
      />
    </div>
);

const UserMarker = () => (
    <img src="src/assets/Map-Pin.svg" className="mainmap-user-icon"></img>
)

function MainMap({ list = [], selected, onSelect, userAllowedLocation, userLocation }) {
    const [center, setCenter] = useState({ lat: 49.267335, lng: -123.128936 })
    
    
    const apiKey=import.meta.env.VITE_API_KEY
    const handleClick = ({lat, lng, item}) => {
        onSelect(item)
        setCenter({lat,lng})
    }
    useEffect(() => {
        if (selected) {
            setCenter({
            lat: selected.lat,
            lng: selected.lng,
            });
        } 
        
        

    }, [selected])

    useEffect(() => {
        if (userAllowedLocation) {
            setCenter({lat: userLocation.lat, lng: userLocation.lng})
        }
    }, [userLocation])
    
    return (
        <div className="mainContainer">
        <GoogleMapReact
        key={userLocation}
        bootstrapURLKeys={{ key: apiKey }}
        center={{ lat: center.lat, lng: center.lng }}
        defaultZoom={12.3}
        >
        {Array.isArray(list) && list.map((item) => (
            <ImageMarker
            key={item.job_id}
            lat={item.lat}
            lng={item.lng}
            logo={item.logo}
            onClick={(e) => {
                e.stopPropagation()
                handleClick({ lat: item.lat, lng: item.lng, item })
            }}
            />
        ))}

        {selected && (
            <MiniDesc
            onClose={() => onSelect(null)}
            lat={selected.lat}
            lng={selected.lng}
            img={selected.logo}
            categories={selected.categories}
            needs={selected.jobneeds}
            donatelink={selected.donatelink}
            applylink={selected.applylink}
            title={selected.title}
            />
        )}

        {userAllowedLocation.current && (
            <UserMarker
            lat={userLocation.lat}
            lng={userLocation.lng}/>
        )}
        </GoogleMapReact>

        </div>
      );
    }

export default MainMap
