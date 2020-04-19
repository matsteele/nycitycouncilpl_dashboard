import React from 'react';
import './App.css';

import mentions from './data/councilseat_mentions.json'
const vals2names = {}
Object.keys(mentions.mentions).forEach(i=>{
  vals2names[mentions.mentions[i]] = { name: mentions.name[i], gender:mentions.gender[i]}
}) 

const colors = {
  greygreen: '#b6cac0',
  emphasis: '#7ED2A8',
  dark:'#2C4A3B',
  basic: '#87968F'
}

const App = () => {
  const width = window.innerWidth
  const chartHeight = window.innerWidth * .15
  const values = Object.keys(vals2names).sort()
  const chartBuffer = width*.1

  console.log(mentions)
  return (
    <div className="App">
      <section>
        <h2>NYC COUNCIL ISSUES</h2>
        <h3>NLP Analysis of historic press releases</h3>
      </section>

      <section>
        <svg className="si-glyph-button-tv" viewBox={`0 0 ${width} ${chartHeight}`}  >
          <text x={chartBuffer*.80} y={chartHeight*.75} textAnchor='end' fill={colors.greygreen}>press </text>
          <text x={chartBuffer*.80} y={chartHeight*.85} textAnchor='end' fill={colors.greygreen}> release </text>
          <text x={chartBuffer*.80} y={chartHeight*.95} textAnchor='end' fill={colors.greygreen}> mentions</text>

          {values.map(function (val, i) {
            return (
              <g key={val}>
                <line x1={chartBuffer + i * ((width-chartBuffer*2) / values.length)} y1={chartHeight} x2={chartBuffer+i * ((width-chartBuffer*2)/ values.length)}  y2={chartHeight - ( chartHeight* .3 * val)} stroke={colors.greygreen} stroke-width='20' />
                <text fill={colors.dark} x={chartBuffer + i * ((width-chartBuffer*2) / values.length)} y='50' writingMode="tb" textAnchor='start' direction='ltr' >{vals2names[val].name}</text>
              </g>
            )
          })}
        </svg>
      </section>
    </div >
  )
}

export default App;
