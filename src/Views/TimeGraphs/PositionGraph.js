
import * as THREE from 'three';

export function PositionGraph(size, location, scene){
    const panel  = addBackPanel(size.x, size.y, size.z, location, scene);
    // const shelf = addShelf(size.x, size.y , size.z, location, scene) ;
    const graphGroup = new THREE.Group();
    graphGroup.add(panel);
    // graphGroup.add(shelf);
    scene.add(graphGroup);
    return graphGroup
}

function addBackPanel(w, h, d, location, scene){
    const panelGeometry = new THREE.BoxGeometry(w, h, d);
    const panelMaterial = new THREE.MeshPhongMaterial({color: '#0872b9', side: THREE.DoubleSide});
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.castShadow = true;
    const x = location.x + panelGeometry.parameters.width/2;
    const y = location.y + panelGeometry.parameters.height/2;
    const z = location.z + panelGeometry.parameters.depth/2;
    panel.position.set(x, y, z);
    panel.rotation.x = Math.PI / 2;
    return panel;
}

function addShelf(w, h, d, location, scene){
    const shelfGeometry = new THREE.BoxGeometry(w, h / 10, d);
    const shelfMaterial = new THREE.MeshPhongMaterial({color: '#ffb900', side: THREE.DoubleSide});
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.castShadow = true;
    const x = location.x + shelfGeometry.parameters.width/2;
    const y = location.y  + (d/2)
    const z = 2 * d+ shelfGeometry.parameters.depth;
    shelf.position.set(x, y, z);
    shelf.rotation.x = Math.PI / 2;
    return shelf;
}

function setBackPanel(panel, w, h, d){
    panel.position.set(w, h, d);
}