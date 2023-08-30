import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { CreateScene } from './CreateScene';
import {data} from '../../Data/csvjsonA';

//change name to the name of the file Template = file_name
const SatellitePath = () => {
    const containerRef = useRef(null);
    
   //Set up the scene, camera, lights, and floor
   const [scene, camera] = CreateScene();
   const earthRadius = 6378100/1000; //converts earth's radius from meters to km

    useEffect(() => {
      const d = data;
      for (let i = 0; i < d.length; i+=200) {

        //Scale down the dimensions - converting original units of meters to kilometers
        d[i]["Pos_x[m]"] = d[i]["Pos_x[m]"] / 1000
        d[i]["Pos_y[m]"] = d[i]["Pos_y[m]"] / 1000
        d[i]["Pos_z[m]"] = d[i]["Pos_z[m]"] / 1000

        //Create points for graphing 
        const dataPointGeometry = new THREE.SphereGeometry(10, 32, 32);
        const dataPointMesh = new THREE.MeshBasicMaterial({color: '#e81510' });
        const dataPoint = new THREE.Mesh(dataPointGeometry, dataPointMesh);
        dataPoint.castShadow = true;
        dataPoint.position.set(d[i]["Pos_x[m]"], d[i]["Pos_y[m]"], d[i]["Pos_z[m]"])
        scene.add(dataPoint);
      };

      //Place holder until a better earth model is created. 
      const earthGeomettry = new THREE.SphereGeometry(earthRadius, 32, 32);
      const earthMesh = new THREE.MeshPhongMaterial({color: '##6fa8dc'});
      const earth = new THREE.Mesh(earthGeomettry, earthMesh);
      earth.position.set(0,0,0);
      earth.castShadow = true;
      scene.add(earth);

      // Create renderer
      const renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.shadowMap.enabled = true;
      renderer.shadowMap. type = THREE.VSMShadowMap;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff);
      containerRef.current.appendChild(renderer.domElement);
      
      const orbitControls = new OrbitControls(camera, renderer.domElement);
      const animate = () => {
          renderer.render(scene, camera);
          requestAnimationFrame(animate)
      }
      
      animate();

      return () => {
          containerRef.current.removeChild( renderer.domElement)
        };
    },[scene, camera]);

return <div ref={containerRef}></div>
};

export default SatellitePath;