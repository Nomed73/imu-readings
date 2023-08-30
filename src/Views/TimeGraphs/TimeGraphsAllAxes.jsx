import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import {PositionGraph} from './PositionGraph';
import dataPoints from '../../Data/data.json';
import axios from 'axios';
import { CreateScene } from './CreateScene';

//change name to the name of the file Template = file name
const TimeGraphsAllAxes = () => {
    const containerRef = useRef(null);
    
    useEffect(() => {

        //Set up the scene, camera, lights, and floor
        const [scene, camera] = CreateScene();

        // Create the graph background
        const graphSize = new THREE.Vector3(10, 10, .25);
        const x_loc = new THREE.Vector3(0,0,0);
        const timeVSPos = PositionGraph(graphSize, x_loc, scene);

        //Add Axes - optional 
        const axes = new THREE.AxesHelper(10);
        scene.add(axes);
        
        //Load JSON data and create data points
        // axios.get('./data.json')
        axios.get('./csvjsonA.json')
        .then(response => {
          const dataSets = response.data;
  
          // Create points for each data set
        //   dataSets.forEach(dataset => {
        //     const pointGeometry = new THREE.BufferGeometry();
        //     const positions = new Float32Array([
        //       dataset.x, dataset.y, dataset.z
        //     ]);

            //Create data
        // dataSets.forEach(d => {
        //     const pointGeometry = new THREE.BufferGeometry();
        //     const positions = new Float32Array([
        //         d.timestamp, 
        //         d["Pos_x[m]"], 
        //         0
        //     ]);
            

        for (let i = 0; i < 10; i+=1) {
            // const d = dataSets[i];
            const d = data;
            d.timestamp *= 100;
            const magnitude = Math.sqrt(d["Pos_x[m]"]**2 + d["Pos_y[m]"]**2 + d["Pos_z[m]"]**2);
            d["Pos_x[m]"] = d["Pos_x[m]"] / magnitude
            d["Pos_y[m]"] = d["Pos_y[m]"] / magnitude
            d["Pos_z[m]"] = d["Pos_z[m]"] / magnitude

            const pointGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
                                    d.timestamp, 
                                    d["Pos_x[m]"],
                                    d["Pos_y[m]"], 
                                    d["Pos_z[m]"]
                                ]);    

            //Create sphere for graphing point. 
            const dataPointGeometry = new THREE.SphereGeometry(.25, 32, 16);
            const dataPointMesh = new THREE.MeshBasicMaterial({color: '#e81510' });
            const dataPoint = new THREE.Mesh(dataPointGeometry, dataPointMesh);
            dataPoint.castShadow = true;
            dataPoint.position.set(d["Pos_x[m]"], d["Pos_y[m]"], d["Pos_z[m]"]);
            console.log("d_x: ", d["Pos_x[m]"]);
            console.log("d_y: ", d["Pos_y[m]"]);
            console.log("d_z: ", d["Pos_z[m]"]);
            scene.add(dataPoint);
  
          };

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
        });

    }, []);
return <div ref={containerRef}></div>
};

//change name to the name of the file Template = file name
export default TimeGraphsAllAxes;