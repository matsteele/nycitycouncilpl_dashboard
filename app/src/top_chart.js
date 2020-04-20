import React from 'react';

import mentions from './data/councilseat_mentions.json';

console.log('mentions',mentions);

const vals2names = {};
Object.keys(mentions.mentions).forEach((i) => {
  vals2names[mentions.mentions[i]] = {
    name: mentions.name[i],
    gender: mentions.gender[i],
  };
});
const values = Object.keys(vals2names).sort();

export default function TopChart(props) {
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
          return (
            <g key={val}>
              <line
                x1={
                  props.chartBuffer +
                  i * ((props.width - props.chartBuffer * 2) / values.length)
                }
                y1={props.chartHeight}
                x2={
                  props.chartBuffer +
                  i * ((props.width - props.chartBuffer * 2) / values.length)
                }
                y2={props.chartHeight - props.chartHeight * 0.3 * val}
                stroke={props.colors.greygreen}
                strokeWidth={props.width * 0.01}
              />
              <text
                fill={props.colors.darkgrey}
                x={
                  props.chartBuffer +
                  i * ((props.width - props.chartBuffer * 2) / values.length)
                }
                y='50'
                writingMode='tb'
                textAnchor='start'
                direction='ltr'
                fontSize='12px'
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
