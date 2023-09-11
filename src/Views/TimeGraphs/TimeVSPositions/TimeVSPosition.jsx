import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import { CreateScene } from './CreateScene';
import {data} from '../../../Data/csvjsonA';
import { setText } from './Text';


//change name to the name of the file Template = file name
const TimeVsPosition = () => {
  const containerRef = useRef(null);

  const [scene, camera] = CreateScene();
  const d = data;

  function marker(col){
    const markerGeo = new THREE.SphereGeometry(30, 32, 32)
    const markerMat = new THREE.MeshPhongMaterial({color: col });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    // scene.add(marker);
    return marker
  }

  function plotData(scene, i, axis, color ){
    if (i < d.length){
        const time = d[i]["timestamp"];
        const position = d[i][axis] / 1000;
        const distance = 2;
        const mark = marker(color);
        mark.position.set(time, position, distance);
        scene.add(mark);
    }
  }
  
  // const dataMarker = marker(scene);
  const textSize = 150;
  const textGap = 350
  setText("X - Position", scene, 50, textSize - 2*textGap, 0, textSize, "#FF0000");
  setText("Y - Position", scene, 50, textSize - 3*textGap, 0, textSize, "#00FF00");
  setText("Z - Position", scene, 50, textSize - 4*textGap, 0, textSize, "#FF00FF");

  const gridSize = 17000;
  const gridDivisions = 50; 
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);


  useEffect(() => {


    // Create a renderer and orbit controller
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap. type = THREE.VSMShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    //Add Axes - optional 
    const axes = new THREE.AxesHelper(1000);
    scene.add(axes);

    //Timer for animation
    let clock = new THREE.Clock();
    let delta = 0;
    let interval = 1/120;
    let i = 0;
    const animate = () => {
      orbitControls.update();
      requestAnimationFrame(animate)
      delta += clock.getDelta();
      renderer.render(scene, camera);
      if (delta > interval){
        plotData(scene, i, "Pos_x[m]", "#FF0000");
        plotData(scene, i, "Pos_y[m]", "#00FF00");
        plotData(scene, i, "Pos_z[m]", "#FF00FF");
        renderer.render(scene, camera);
        delta = delta % interval;
        i+=100;
      }
    }
        
    

    animate();
        
      return () => {
          containerRef.current.removeChild( renderer.domElement)
        };

    }, []);
return <div ref={containerRef}></div>
};

export default TimeVsPosition;