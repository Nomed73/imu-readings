import * as THREE from 'three';

export const getCube = (scene, l, w, h, col) => {
    // Cube setup
    const geometry = new THREE.BoxGeometry(l, w, h);
    const material = new THREE.MeshPhongMaterial({ color: col });
    const cube = new THREE.Mesh(geometry, material);
    // cube.position.x = 2;
    // cube.position.y = 2;
    // cube.position.z = 2
    cube.position.set(2,2,2)
    cube.castShadow = true;
    scene.add(cube)
    return cube;
  }

export const getCylinder = (scene, topRadius, bottomRadius, height, radialSegments, heightSegments, col) => {
  //Cylinder Setup
  const geometry = new THREE.CylinderGeometry(topRadius, bottomRadius, height, radialSegments, heightSegments);
  const material = new THREE.MeshPhongMaterial({color: col});
  const cylinder = new THREE.Mesh(geometry, material)
  cylinder.castShadow = true;
  cylinder.position.x = 2;
  scene.add(cylinder);
  return cylinder
}

  // create a very large ground plane
export const getGround = (scene) => { 
  const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
  const groundMaterial = new THREE.MeshLambertMaterial({color: 0xffffff });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.position.set(0, -2, 0);
  groundMesh.rotation.set(Math.PI / -2, 0, 0);
  groundMesh.receiveShadow = true;
  scene.add(groundMesh)
  return groundMesh;
}