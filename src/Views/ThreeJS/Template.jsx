import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

//change name to the name of the file Template = file name
const Template = () => {
    const containerRef = useRef(null);
    
    useEffect(() => {

        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        //Camera positions
        // camera.position.x = -3;
        // camera.position.z = 8;
        // camera.position.y = 2;
        
        // Create a renderer
        const renderer = new THREE.WebGLRenderer({antialias: true});
        //Optional
        renderer.shadowMap.enabled = true;
        renderer.shadowMap. type = THREE.VSMShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff);
        containerRef.current.appendChild(renderer.domElement);
        
        // Create Scene
        const scene = new THREE.Scene();
        scene.backgroundColor = 0xffffff;
        scene.fog = new THREE.Fog(0xffffff, 0.0025, 50);

        // Create Lights
        scene.add(new THREE.AmbientLight(0x666666));
        scene.add(THREE.DirectionalLight(0xaaaaaa));
        dirLight.position.set(5,12,8);
        dirLight.castShadow = true;
        scene.add(dirLight)

        // Create a floor
        const geo = new THREE.BoxGeometry(10, 0.25, 10, 10, 10, 10);
        const mat = new THREE.MeshStandardMaterial({ color: 0xffffff,});
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        //Add Axes - optional 
        const axes = new THREE.AxesHelper(10);
        scene.add(axes);

        
        
        return () => {
            // window.removeEventListener('resize', handleResize);
            containerRef.current.removeChild( renderer.domElement)
          };

    }, []);
return <div ref={containerRef}></div>
};

//change name to the name of the file Template = file name
export default Template;