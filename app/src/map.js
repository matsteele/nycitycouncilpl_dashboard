import React, { useEffect, createRef, useState } from 'react';
import { Map as LeafletMap, GeoJSON, ImageOverlay } from 'react-leaflet';
import CouncilDistricts from './data/council_districts.json';
import logo from './logo.png';

console.log('CouncilDistricts', CouncilDistricts)


export default function Map(props) {
  const mapRef = createRef();

  const [seatImg, setseatImg] = useState(false);


  useEffect(() => {
    
    const seat2show = props.seatClicked? props.seatClicked : props.seatHovered
    const newHS = `/images/headshots/${seat2show}.jpg`
    setseatImg(newHS)
  }, [props.seatClicked, props.seatHovered])

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
    <section >
      <img
        style={{
          display: 'block',
          position: 'absolute',
          zIndex: 10,
          left: props.chartBuffer,
        }}
        src={seatImg}
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
          onMouseIn={(e) => {
            if (!props.seatClicked)
              props.setseatHovered(e.layer.feature.properties.coun_dist);
          }}
          onMouseOut={(e) => {
            if (!props.seatClicked) props.setseatHovered(false);
          }}
          onMouseOver={(e) => {
            if (!props.seatClicked)
              props.setseatHovered(e.layer.feature.properties.coun_dist);
          }}
          onClick={onClick}
          ref={mapRef}
          data={CouncilDistricts}
          style={function (geoJsonFeature) {
            return {
              color:
                props.seatClicked == geoJsonFeature.properties.coun_dist
                  ? props.colors.emphasis
                  : 'white',
              weight:
                props.seatClicked == geoJsonFeature.properties.coun_dist
                  ? 4
                  : 0.5,
              fillColor: props.seatClicked
                ? props.seatClicked == geoJsonFeature.properties.coun_dist
                  ? props.colors.emphasis
                  : props.colors.greygreen
                : props.seatHovered == geoJsonFeature.properties.coun_dist
                ? props.colors.emphasis
                : props.colors.greygreen,

              fillOpacity: props.seatClicked
                ? props.seatClicked == geoJsonFeature.properties.coun_dist
                  ? 1
                  : 0.5
                : 1,
            };
          }}
        />
      </LeafletMap>
    </section>
  );
}
