import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import axios from 'axios';

function Sample() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load JSON data
    axios.get('./data.json')
      .then(response => {
        const dataSets = response.data;

        // Create points for each data set
        dataSets.forEach(dataset => {
          const pointGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array([
            dataset.x, dataset.y, dataset.z
          ]);
          console.log("position: ", positions)
          pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          // const pointMaterial = new THREE.PointsMaterial({ color: 0xffffff });
          // const point = new THREE.Points(pointGeometry, pointMaterial);
          // scene.add(point);

          const dataPointGeometry = new THREE.SphereGeometry(1, 32, 16);
          const dataPointMesh = new THREE.MeshBasicMaterial({color: 0xffff00 });
          const dataPoint = new THREE.Mesh(dataPointGeometry, dataPointMesh);
          dataPoint.position.set(dataset.x, dataset.y, dataset.z);
          scene.add(dataPoint);

        });

        // Set camera position
        camera.position.z = 20;

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };

        animate();
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
      });
  }, []);

  return (
    <div ref={containerRef} />
  );
}

export default Sample;
