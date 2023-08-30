import * as THREE from 'three';


//set the scene and camera for a default position. 
export function CreateScene(){
    const scene = new THREE.Scene();
    scene.backgroundColor = 'black';//0xffffff;
    scene.fog = new THREE.Fog(0xffffff, 0.0025, 12000);
    const camera = setCamera(scene);
    setLights(scene);
    return [scene, camera];
}

function setCamera(scene){
    const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 1, 15000);
    camera.position.set(-7000,1300, 2000)
    return camera
}

function setLights(scene){
    scene.add(new THREE.AmbientLight(0x666666));
    const dirLight = new THREE.DirectionalLight(0xaaaaaa, 7);
    dirLight.position.set(0, 0, 15000);
    dirLight.castShadow = true;
    scene.add(dirLight) 
}

function setFloor(scene){
    const geo = new THREE.PlaneGeometry(50,50);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff,});
    const floor = new THREE.Mesh(geo, mat);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -10;
    scene.add(floor);
}