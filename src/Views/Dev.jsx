import React from 'react';
// import GraphComponent from './Samples/GraphComponent';
// import CSVImport from './Samples/CSVImport';
import ThreeJSComponent from './ThreeJS/ThreeJSComponent';
// import GettingStarted from './ThreeJS/Ch01/GettingStarted';
// import BasicScene from './ThreeJS/Ch02/BasicScene';
// import IMUSatellite from './ThreeJS/Ex01/components/IMUStatellite';
import TimeGraphs from './TimeGraphs/TimeGraphs';
import Sample from './TimeGraphs/Sample';

const Dev = () => {
  return (
    <div>
      <h1>{"DEV VIEW"}</h1> 
        <div>
          {/* <IMUSatellite/> */}
          {/* <ThreeJSComponent/> */}
          {/* <TimeGraphs/> */}
          <Sample/>
        </div> 
    </div>
  );
}

export default Dev;