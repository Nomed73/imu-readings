import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphComponent = () => {
  const graphRef = useRef(null);

  useEffect(() => {
    // Load and parse CSV data
    d3.csv('/src/Data/DataSample02.csv').then((data) => {
      data.forEach((d) => {
        d.timestamp = +d.timestamp;
        d.Pos_x = +d.Pos_x;
        console.log(d)

      });

      // Create the d3.js graph
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      const svg = d3.select(graphRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.timestamp))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Pos_x))
        .range([height, 0]);

      const line = d3.line()
        .x(d => x(d.timestamp))
        .y(d => y(d.Pos_x));

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);
    });
  }, []);

  return (
    <div ref={graphRef}></div>
  );
};

export default GraphComponent;
