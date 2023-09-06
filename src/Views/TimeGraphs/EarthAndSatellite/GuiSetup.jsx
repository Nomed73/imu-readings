import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GUI from "lil-gui";


//GUI: Setup gui controller
export function createGuiController(scene, camera){
    const gui = new GUI();
    const cameraZPosition = new THREE.Group();
    const cameraXRotation =  new THREE.Group();
    const cameraYRotation =  new THREE.Group();
    const cameraZRotation = new THREE.Group();
    cameraZPosition.add(camera);
    cameraXRotation.add(cameraZPosition);
    cameraYRotation.add(cameraXRotation);
    cameraZRotation.add(cameraYRotation);
    scene.add(cameraZRotation);
    gui.add(cameraZPosition.position, 'z', 0, 5000);
    gui.add(cameraXRotation.rotation, 'x', -Math.PI, Math.PI);
    gui.add(cameraYRotation.rotation, 'y', -Math.PI, Math.PI);
    gui.add(cameraZRotation.rotation, 'z', -Math.PI, Math.PI);

}
  