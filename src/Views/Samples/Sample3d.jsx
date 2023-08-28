import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const dataSet = [
    { x: 10, y: 20, z: 30 },
    { x: 40, y: 50, z: 60 },
    { x: 70, y: 80, z: 90 },
    // Add more data points here
  ];

const ScatterPlot = ({}) => {
  const svgRef = useRef();
  const data = dataSet
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height, 0]);

    const zScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.z)])
      .range([0, 100]); // Adjust the range based on your needs

    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([0, data.length]);

    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => zScale(d.z))
      .attr('fill', (d, i) => colorScale(i));

    // Add axis labels and other styling as needed
  }, [data]);

  return (
    <svg ref={svgRef} width={800} height={600}></svg>
  );
};

export default ScatterPlot;
