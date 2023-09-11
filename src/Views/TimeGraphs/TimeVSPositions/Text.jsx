import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


export function setText(text, scene, posX, posY, posZ, size, color){
  
  const loader = new FontLoader();
  loader.load( 'src/assets/fonts/helvetiker_regular.typeface.json', function ( font ) {

    const textGeo = new TextGeometry( text, {
      font: font,
      size: size,
      height: 10,
      curveSegments: 100,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 2
    } );

    const textMat = new THREE.MeshPhongMaterial({color: color});
    const mesh = new THREE.Mesh(textGeo, textMat);
    mesh.position.set(posX, posY, posZ + 10);
    scene.add(mesh);
  } );
}