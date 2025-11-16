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

    const defaultProps = {
        center: {
          lat: 49.267535,
          lng: -123.128936
        },
        zoom: 13
      };
    const apiKey="AIzaSyBbv1HmlxvjKw8TfpeMszI8I5vUaPqUqTQ"
    return (
        <div className="mainContainer">
    


        <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        >
        {list.map((item) => (
            <ImageMarker
            key={item.id}
            lat={item.lat}
            lng={item.lng}
            img={item.img}
            onClick={() => onSelect(item)}
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
            link={selected.link}
            />
        )}
        </GoogleMapReact>

        </div>
      );
    }

export default MainMap
