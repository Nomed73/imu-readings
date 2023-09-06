import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import {PositionGraph} from './PositionGraph';
import dataPoints from '../../Data/data.json';
import axios from 'axios';
import { CreateScene } from './EarthAndSatellite/CreateSpaceScene';

//change name to the name of the file Template = file name
const TimeGraphs = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {

    //Set up the scene, camera, lights, and floor
    const [scene, camera] = CreateScene();

    // Create the graph background
    const graphSize = new THREE.Vector3(1000, 1000, .25);
    const x_loc = new THREE.Vector3(0,0,0);
    const timeVSPos = PositionGraph(graphSize, x_loc, scene);

    //Add Axes - optional 
    const axes = new THREE.AxesHelper(10);
    scene.add(axes);
  
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
        // });

    }, []);

return <div ref={containerRef}></div>
};

//change name to the name of the file Template = file name
export default TimeGraphs;