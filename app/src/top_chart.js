import React from 'react';

import mentions from './data/councilseat_mentions.json';

const vals2names = {};
Object.keys(mentions.mentions).forEach((i) => {
  vals2names[mentions.mentions[i]] = {
    name: mentions.name[i],
    gender: mentions.gender[i],
    seat: parseInt(i) + 1,
  };
});
const values = Object.keys(vals2names).sort();

export default function TopChart(props) {
  console.log('props.seatHovered', props.seatHovered);

  const onClick = (seat) => {
    if (!seat || seat === props.seatClicked) {
      props.setseatClicked(false);
    } else {
      props.setseatClicked(seat);
    }
  };

  return (
    <section>
      <svg
        className='si-glyph-button-tv'
        viewBox={`0 0 ${props.width} ${props.chartHeight}`}
      >
        {['press', 'release', 'mentions'].map((descr, i) => {
          return (
            <text
              x={props.chartBuffer * 0.75}
              y={props.chartHeight * (0.35 + i * 0.15)}
              textAnchor='end'
              fill={props.colors.greygreen}
            >
              {descr}
            </text>
          );
        })}

        {values.map(function (val, i) {

          const seatX= (props.chartBuffer + i * ((props.width - props.chartBuffer * 2) / values.length))
          const seatYBase = props.chartHeight - props.chartHeight * 0.3 * val;
          
          return (
            <g
              key={vals2names[val].seat}
              id={vals2names[val].seat}
              onClick={() => onClick(vals2names[val].seat)}
              onMouseOver={(e) => {
                if (!props.seatClicked)
                  props.setseatHovered(vals2names[val].seat);
              }}
            >
              <line
                key={vals2names[val].seat}
                x1={seatX}
                y1={props.chartHeight}
                x2={seatX}
                y2={
                  props.seatClicked
                    ? props.seatClicked == vals2names[val].seat
                      ? 0
                      : seatYBase
                    : seatYBase
                }
                stroke={
                  props.seatClicked
                    ? props.seatClicked == vals2names[val].seat
                      ? props.colors.emphasis
                      : props.colors.greygreen
                    : props.seatHovered == vals2names[val].seat
                    ? props.colors.emphasis
                    : props.colors.greygreen
                }
                strokeWidth={
                  props.seatClicked == vals2names[val].seat
                    ? props.width * 0.012
                    : props.width * 0.01
                }
                opacity={
                  props.seatClicked
                    ? props.seatClicked == vals2names[val].seat
                      ? 1
                      : 0.5
                    : 1
                }
              />
              <text
                fill={
                  props.seatClicked
                    ? props.seatClicked == vals2names[val].seat
                      ? 'white'
                      : props.colors.darkgrey
                    : props.colors.darkgrey
                }
                x={seatX}
                y='50'
                writingMode='tb'
                textAnchor='start'
                direction='ltr'
                fontSize='13'
                opacity={
                  props.seatClicked
                    ? props.seatClicked == vals2names[val].seat
                      ? 1
                      : 0.5
                    : 1
                }
              >
                {vals2names[val].name}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

// <GeoJSON
//   onMouseIn={(e) => {
//     if (!props.seatClicked)
//       props.setseatHovered(e.layer.feature.properties.coun_dist);
//   }}
//   onMouseOut={(e) => {
//     if (!props.seatClicked) props.setseatHovered(false);
//   }}

//   onClick={onClick}
//   ref={mapRef}
//   data={CouncilDistricts}
//   style={function (geoJsonFeature) {
//     return {
//       color:
//         props.seatClicked == geoJsonFeature.properties.coun_dist
//           ? props.colors.emphasis
//           : 'white',
//       weight:
//         props.seatClicked == geoJsonFeature.properties.coun_dist
//           ? 4
//           : 0.5,
//       fillColor: props.seatClicked
//         ? props.seatClicked == geoJsonFeature.properties.coun_dist
//           ? props.colors.emphasis
//           : props.colors.greygreen
//         : props.seatHovered == geoJsonFeature.properties.coun_dist
//         ? props.colors.emphasis
//         : props.colors.greygreen,

//       fillOpacity: props.seatClicked
//         ? props.seatClicked == geoJsonFeature.properties.coun_dist
//           ? 1
//           : 0.5
//         : 1,
//     };
//   }}
// />
