import React from 'react';
import AnimateSatellite from './TimeGraphs/EarthAndSatellite/AnimateSatellite';
import TimeVsPosition from './TimeGraphs/TimeVSPositions/TimeVSPosition';

const Dev = () => {
  return (
    <div>
      <h1>{"DEV VIEW"}</h1> 
        <div>
          <TimeVsPosition/>
          <AnimateSatellite/>
        </div> 
    </div>
  );
}

export default Dev;