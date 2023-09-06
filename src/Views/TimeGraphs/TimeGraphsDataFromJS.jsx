import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import {PositionGraph} from './PositionGraph';
import dataPoints from '../../Data/data.json';
import axios from 'axios';
import { CreateScene } from './EarthAndSatellite/CreateSpaceScene';
import {data} from '../../Data/csvjsonA';

//change name to the name of the file Template = file_name
const TimeGraphsDataFromJS = () => {
    const containerRef = useRef(null);
    
   //Set up the scene, camera, lights, and floor
   const [scene, camera] = CreateScene();
   const earthRadius = 6378100/1000; //in meters

    useEffect(() => {

      // //Set up the scene, camera, lights, and floor
      // const [scene, camera] = CreateScene();

      // Create the graph background
      // const graphSize = new THREE.Vector3(12000, 12000, 100);
      // const x_loc = new THREE.Vector3(-10000,0,-10000);
      // const timeVSPos = PositionGraph(graphSize, x_loc, scene);

      //Add Axes - optional 
      const axes = new THREE.AxesHelper(1000);
      scene.add(axes);
        
      const d = data;
      for (let i = 0; i < d.length; i+=200) {

        //Scale down the dimensions
        d[i]["Pos_x[m]"] = d[i]["Pos_x[m]"] / 1000
        d[i]["Pos_y[m]"] = d[i]["Pos_y[m]"] / 1000
        d[i]["Pos_z[m]"] = d[i]["Pos_z[m]"] / 1000

        //Create sphere for graphing point. 
        const dataPointGeometry = new THREE.SphereGeometry(10, 32, 32);
        const dataPointMesh = new THREE.MeshBasicMaterial({color: '#e81510' });
        const dataPoint = new THREE.Mesh(dataPointGeometry, dataPointMesh);
        dataPoint.castShadow = true;
        dataPoint.position.set(d[i]["Pos_x[m]"], d[i]["Pos_y[m]"], d[i]["Pos_z[m]"])
        // dataPoint.position.set(data[i].timestamp, data[i]["Pos_y[m]"], 2);
        console.log("current Point: ", i, ": ", Math.round(d[i]["Pos_x[m]"],4), Math.round(d[i]["Pos_y[m]"],2), Math.round(d[i]["Pos_z[m]"],2));
        scene.add(dataPoint);
  
      };

      const earthGeomettry = new THREE.SphereGeometry(earthRadius, 32, 32);
      const earthMesh = new THREE.MeshPhongMaterial({color: '##6fa8dc'});
      const earth = new THREE.Mesh(earthGeomettry, earthMesh);
      earth.position.set(0,0,0);
      earth.castShadow = true;
      scene.add(earth);


      // Create a renderer
      const renderer = new THREE.WebGLRenderer({antialias: true});
      //Optional
      renderer.shadowMap.enabled = true;
      renderer.shadowMap. type = THREE.VSMShadowMap;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff);
      containerRef.current.appendChild(renderer.domElement);
      
      const orbitControls = new OrbitControls(camera, renderer.domElement);
      const count = 0;
      const animate = () => {
          renderer.render(scene, camera);
          requestAnimationFrame(animate)
      }
      
      animate();

      return () => {
          // window.removeEventListener('resize', handleResize);
          containerRef.current.removeChild( renderer.domElement)
          // containerRef.current.appendChild(renderer.domElement)
        };
    },[scene, camera]);

    // }, []);
return <div ref={containerRef}></div>
};

//change name to the name of the file Template = file name
export default TimeGraphsDataFromJS;