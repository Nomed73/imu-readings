import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function CSVImport() {
  const dataContainerRef = useRef(null);
  const [importedData, setImportedData] = useState([]);

  useEffect(() => {
    d3.csv("../../Data/DataSample02.csv").then(function(data) {
      const dataContainer = d3.select(dataContainerRef.current);

      const table = dataContainer.append("table");
      const thead = table.append("thead");
      const tbody = table.append("tbody");

      // Append table headers
      thead.append("tr")
        .selectAll("th")
        .data(d3.keys(data[0]))
        .enter()
        .append("th")
        .text(function(d) { return d; });

      // Append table rows
      const rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

      // Append cells within rows
      const cells = rows.selectAll("td")
        .data(function(row) {
          return d3.values(row);
        })
        .enter()
        .append("td")
        .text(function(d) { return d; });

      // Store imported data in state
      setImportedData(data);
    });
  }, []);

  return (
    <div>
      <h1>CSV Import with d3.js in React</h1>
      <div ref={dataContainerRef}></div>
      
      <h2>Imported Data</h2>
      <ul>
        {importedData.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
}

export default CSVImport;
