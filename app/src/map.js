import React, { useEffect, useState } from 'react';
import { Map as LeafletMap, GeoJSON, ImageOverlay } from 'react-leaflet';
import CouncilDistricts from './data/council_districts.json';

import logo from './logo.png';

export default function Map(props) {

  const [seatImg, setseatImg] = useState(false)

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const onMouseOut = (e) => {
    props.setseatHovered(false);
  };

  const onMouseIn = (e) => {
    props.setseatHovered(e.layer.feature.properties.coun_dist);
  };

  const onMouseOver = (e) => {
    props.setseatHovered(e.layer.feature.properties.coun_dist);
  };

  const onClick = (e) => {
    if (
      !e.layer.feature.properties.coun_dist ||
      e.layer.feature.properties.coun_dist === props.seatClicked
    ) {
      props.setseatClicked(false);
    } else {
      props.setseatClicked(e.layer.feature.properties.coun_dist);
    }
  };

  return (
    <>
      <img
        style={{
          display: 'block',
          position: 'absolute',
          zIndex: 10,
          left: props.chartBuffer,
        }}
        src={logo}
      ></img>
      <LeafletMap
        center={[40.713685, -73.974095]}
        zoom={11}
        maxZoom={20}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <GeoJSON
          onMouseIn={onMouseIn}
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
          onClick={onClick}
          data={CouncilDistricts}
          style={{
            color: 'white',
            weight: 0.5,
            fillColor: props.colors.greygreen,
            fillOpacity: 1,
          }}
        />
      </LeafletMap>
    </>
  );
}
