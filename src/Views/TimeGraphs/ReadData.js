import React from 'react';
import data from '../../Data/csvjsonA.json' assert {type: 'json'};

for (let i = 0; i < data.length / 10; i++){
    console.log("time: ", data[i].timestamp, "Pos_x: ", data[i]["Pos_x[m]"]/1000)
}