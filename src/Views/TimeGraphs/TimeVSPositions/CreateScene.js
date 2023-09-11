import * as THREE from 'three';


//set the scene and camera for a default position. 
export function CreateScene(){
    const scene = new THREE.Scene();
    scene.backgroundColor = 0xffffff;
    // scene.fog = new THREE.Fog(0xffffff, 0.0025, 6000); 
    const camera = setCamera(scene);
    setLights(scene);
    setTimeAxis(scene);
    setPositionAxis(scene);
    // setBack(scene);
    return [scene, camera];
}

function setCamera(scene){
    const left = -1500;
    const right = 15000;
    const top = 15000;
    const bottom = -17000;
    const near = -1500
    const far = 1500
    const viewSize= 7500;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(aspectRatio * left/2, aspectRatio*right/2, top/2, bottom/2, near, far);
    // const camera = new THREE.OrthographicCamera( - aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2, - viewSize / 2, -7000, 7000 );
    camera.position.set(0,0,4);
    scene.add( camera );
    return camera
}

function setLights(scene){
    scene.add(new THREE.AmbientLight(0x666666, 10));
    const dirLight = new THREE.DirectionalLight(0xaaaaaa, 10);
    dirLight.position.set(-1,2,3);
    dirLight.castShadow = true;
    scene.add(dirLight) 
}

function setTimeAxis(scene){
    const length = 7000;
    const width = 50;
    const depth = 100;
    const geo = new THREE.BoxGeometry(length, width, depth)
    const mat = new THREE.MeshStandardMaterial({color: 0xffffff })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(length / 2 - 100, 0, depth / 2)
    mesh.receiveShadow = true
    mesh.name = 'floating-floor'
    scene.add(mesh)
}

function setPositionAxis(scene){
    const length = 20;
    const width = 15000;
    const depth = 50;
    const geo = new THREE.BoxGeometry(length, width, depth)
    const mat = new THREE.MeshStandardMaterial({color: 0xffffff })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(0, 0, depth / 2)
    mesh.receiveShadow = true
    mesh.name = 'floating-floor'
    scene.add(mesh)
}

function setBack(scene){
    const length = 8000;
    const width = 20;
    const depth = 15000;
    const geo = new THREE.BoxGeometry(length, width, depth)
    const mat = new THREE.MeshStandardMaterial({color: 0xc8c9b4 })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(length / 2 - 1000, width, -10)
    mesh.rotation.x = Math.PI / 2;
    mesh.receiveShadow = true
    mesh.name = 'floating-panel'
    scene.add(mesh)
}