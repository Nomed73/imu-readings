import * as d3 from "d3";
import {useRef, useEffect} from "react";

const Circles = () => {
    const [dataset, setDataset] = useState(
      generateDataset()
    )
    useInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 2000)
    return (
      <svg viewBox="0 0 100 50">
        {dataset.map(([x, y], i) => (
          <circle
            cx={x}
            cy={y}
            r="3"
          />
        ))}
      </svg>
    )
  }

  export default Circles