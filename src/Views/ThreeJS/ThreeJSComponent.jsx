import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getCube, getCylinder, getGround } from './Shapes/Shapes';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import data from './data.json';
// import { json } from 'd3';


const ThreeJSComponent = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.backgroundColor = 0xffffff;
    scene.fog = new THREE.Fog(0xffffff, 0.0025, 25);
  
    // Create objects
    const cube = getCube(scene, 1,1,1, 'red');
    // const cylinder = getCylinder(scene, 1, 1, 1, 12, 2, 'green');
    // scene.add(cylinder);
    const ground = getGround(scene);
    
    
    //Create camera
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100, 1);
    camera.position.set(6, 3, 10)
    
    // Add camera and axes helpers
    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper)
    const axes = new THREE.AxesHelper(10)
    scene.add(axes)
    
    //Add lights
    scene.add(new THREE.AmbientLight(0x666666));
    const dirLight = new THREE.DirectionalLight(0xaaaaaa);
    dirLight.position.set(25, 50, 75);
    dirLight.castShadow = true;
    scene.add(dirLight) 

    // Renderer
    const renderer = new THREE.WebGLRenderer( {antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    containerRef.current.appendChild(renderer.domElement);

    // Animation
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    var index = 0;
    const animate = () => {

      renderer.render(scene, camera);
      orbitControls.update();
      cameraHelper.update();
      requestAnimationFrame(animate);

      cube.position.x += 0.01;
      cube.position.y += 0.01;
      cube.position.z += 0.01;

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      // cube.rotation.z += 0.01;

    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    

    return () => {
      // window.removeEventListener('resize', handleResize);
      containerRef.current.removeChild( renderer.domElement)
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default ThreeJSComponent;
