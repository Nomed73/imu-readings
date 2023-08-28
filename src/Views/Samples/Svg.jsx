import * as d3 from "d3";
import {useRef, useEffect} from "react";

const Svg = () => {
    return (
      <svg style={{ border: "2px solid gold"}}
        width="200" 
        height="200">
        <circle 
          cx="100" 
          cy="100" 
          r="50"
          fill="blue"
          stroke="black"
          stroke-width="5"
        >
        </circle>
      </svg>
    )
  }

  export default Svg