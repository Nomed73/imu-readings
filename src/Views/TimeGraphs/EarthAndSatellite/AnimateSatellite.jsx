import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { CreateScene } from './CreateSpaceScene';
import {data} from '../../../Data/csvjsonA';
import GUI from "lil-gui";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createGuiController } from './GuiSetup';
import { createSatellite, moveSatellite, earthModel } from './Models';


//change name to the name of the file Template = file_name
const AnimateSatellite = () => {
  const containerRef = useRef(null);
  
  //Set up the scene, camera, lights, and floor
  const [scene, camera] = CreateScene();
  
  //MODELS: Create the earth and the satellite models.
  earthModel(scene)
  const satellite = createSatellite(scene);
  
  //GUI: Setup gui controller
  createGuiController(scene, camera);
  
  useEffect(() => {
    // Create renderer
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap. type = THREE.VSMShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    containerRef.current.appendChild(renderer.domElement);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    
    //Timer for animation
    let clock = new THREE.Clock();
    let delta = 0;
    let interval = 1/120;
    let i = 0;

    const animate = () => {
      orbitControls.update();
      requestAnimationFrame(animate)
      delta += clock.getDelta();
      if (delta > interval){
        moveSatellite(i, satellite, scene);
        renderer.render(scene, camera);
        delta = delta % interval;
        i+=120;
        if (i >= data.length) {
          i = 0;
        }
      }
    }
      
    animate();

    return () => {
        containerRef.current.removeChild( renderer.domElement)
      };
  },[scene, camera]);

return <div ref={containerRef}></div>
};

export default AnimateSatellite;