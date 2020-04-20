import React, {useState} from 'react';
import './App.css';
import Map from './map';
import TopChart from './top_chart'

const colors = {
  greygreen: '#b6cac0',
  darkgrey:'#434A46',
  emphasis: '#7ED2A8',
  dark: '#2C4A3B',
  basic: '#87968F',
};

const App = () => {
  const width = window.outerWidth;
  const chartHeight = window.outerWidth * 0.15;
  const chartBuffer = width * 0.1;

  const [seatHovered, setseatHovered] = useState(false)
  const [seatClicked, setseatClicked] = useState(false);


  return (
    <div className='App'>
      <section>
        <h2>NYC COUNCIL ISSUES</h2>
        <h3>NLP Analysis of historic press releases</h3>
      </section>

      <TopChart
        colors={colors}
        width={width}
        chartHeight={chartHeight}
        seatHovered={seatHovered}
        seatClicked={seatClicked}
        chartBuffer={chartBuffer}
      />
      <Map
        colors={colors}
        width={width}
        seatHovered={seatHovered}
        seatClicked={seatClicked}
        setseatHovered={setseatHovered}
        setseatClicked={setseatClicked}
        chartHeight={chartHeight}
        chartBuffer={chartBuffer}
      />
    </div>
  );
};

export default App;
