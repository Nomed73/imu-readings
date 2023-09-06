import * as THREE from 'three';


//set the scene and camera for a default position. 
export function CreateScene(){
    const scene = new THREE.Scene();
    scene.backgroundColor = '#000000';//0xffffff;
    scene.fog = new THREE.Fog(0xffffff, 0.0025, 12000); 
    const camera = setCamera(scene);
    setLights(scene);
    createStars(scene);
    return [scene, camera];
}

function setCamera(scene){
    const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(7500, 0, 1800)
    return camera
}

function setLights(scene){
    scene.add(new THREE.AmbientLight(0x666666, 20));
    const dirLight = new THREE.DirectionalLight(0xaaaaaa, 20);
    dirLight.position.set(-1,2,4);
    dirLight.castShadow = true;
    scene.add(dirLight) 
}

function createStars(scene){
    var stars = new Array(0);
    for ( var i = 0; i < 10000; i ++ ) {
        let x = THREE.MathUtils.randFloatSpread( 20000 );
        let y = THREE.MathUtils.randFloatSpread( 20000 );
        let z = THREE.MathUtils.randFloatSpread( 20000 );
        stars.push(x, y, z);
    }
    var starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute( "position", new THREE.Float32BufferAttribute(stars, 3));
    var starsMaterial = new THREE.PointsMaterial( { color: 0xFFFFBA } );
    var starField = new THREE.Points( starsGeometry, starsMaterial );
    scene.add( starField );
}

function setFloor(scene){
    const geo = new THREE.PlaneGeometry(50,50);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff,});
    const floor = new THREE.Mesh(geo, mat);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -10;
    scene.add(floor);
}