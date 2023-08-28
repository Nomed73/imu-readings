import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import {PositionGraph} from './PositionGraph';
import dataPoints from '../../Data/data.json'

//change name to the name of the file Template = file name
const TimeGraphs = () => {
    const containerRef = useRef(null);
    
    useEffect(() => {
        // Create Scene
        const scene = new THREE.Scene();
        scene.backgroundColor = 0xffffff;
        scene.fog = new THREE.Fog(0xffffff, 0.0025, 50);

        // Create a camera
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-5,0, 10)
        
        // Create Lights
        scene.add(new THREE.AmbientLight(0x666666));
        const dirLight = new THREE.DirectionalLight(0xaaaaaa);
        dirLight.position.set(25, 50, 75);
        dirLight.castShadow = true;
        scene.add(dirLight) 
        
        // Create a floor
        const geo = new THREE.PlaneGeometry(50,50);
        const mat = new THREE.MeshStandardMaterial({ color: 0xffffff,});
        const floor = new THREE.Mesh(geo, mat);
        scene.add(floor);
        
        //Create the plane for the time and pos_x graph
        // const posXGeo = new THREE.BoxGeometry(10, 0.25, 5);
        // const posXMaterial = new THREE.MeshPhongMaterial({color: '#0872b9', side: THREE.DoubleSide});
        // const timePosXPlane = new THREE.Mesh(posXGeo, posXMaterial);
        // scene.add(timePosXPlane);
        // timePosXPlane.rotation.x = Math.PI / 2;
        // timePosXPlane.position.set(0, 2.5,0);
        const graphSize = new THREE.Vector3(10, 5, .25);
        const x_loc = new THREE.Vector3(0,0,0);
        const timeVSPosX = PositionGraph(graphSize, x_loc, scene);
        // scene.add(timePosXPlane);


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

    }, []);
return <div ref={containerRef}></div>
};

//change name to the name of the file Template = file name
export default TimeGraphs;