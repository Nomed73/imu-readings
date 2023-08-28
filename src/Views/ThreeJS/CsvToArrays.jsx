
import React, {useState} from 'react';
import dataSample02 from '../ThreeJS/dataSamples02'

 const csvToArray = () => {

    const [file, setFile] = useState();
    const fileReader = new FileReader();
    setFile = dataSample02;
    const rows = csv.split('\n');
    const result = [];

    for (const row of rows){
        const values = row.split(',');
        result.push(values);
    }

    console.log(result)
    return SpeechRecognitionResultList;
 }