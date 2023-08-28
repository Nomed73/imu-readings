// components/IMUSatellite.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { loadIMUData } from '../utils/dataUtils';

function IMUSatellite() {
  const sceneRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const satelliteGeometry = new THREE.CylinderGeometry(1, 1, 5, 16);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    scene.add(satellite);

    loadIMUData('src/Views/ThreeJS/Ex01/components/dataSample02.json{location.origin}/dataSample02.json').then(data => {
      const timeFactor = 0.01; // Adjust this to control animation speed
      let dataIndex = 0;
      const totalDataPoints = data.length;
      console.log('data = ', data)

      const animateSatellite = () => {
        const dataPoint = data[dataIndex];
        const posX = parseFloat(dataPoint["Pos_x[m]"]);
        const posY = parseFloat(dataPoint["Pos_y[m]"]);
        const posZ = parseFloat(dataPoint["Pos_z[m]"]);
        const quatW = parseFloat(dataPoint.q_w);
        const quatX = parseFloat(dataPoint.q_x);
        const quatY = parseFloat(dataPoint.q_y);
        const quatZ = parseFloat(dataPoint.q_z);

        satellite.position.set(posX, posY, posZ);
        satellite.quaternion.set(quatX, quatY, quatZ, quatW);

        dataIndex = (dataIndex + 1) % totalDataPoints;

        requestAnimationFrame(animateSatellite);
      };

      animateSatellite();
    });

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={sceneRef} />;
}

export default IMUSatellite;
