import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {data} from '../../../Data/csvjsonA';


// Data source: src/Data/csvjsonA.js
// historical satellite data provided by Cielo
const d = data

export function createSatellite(scene){
  //SATELLITE: Initial satellite position from data.
  const satetelliteGeometry = new THREE.CylinderGeometry(50, 50, 32,);
  const satelliteMesh = new THREE.MeshPhongMaterial({color: '#95C574' });
  const satellite = new THREE.Mesh(satetelliteGeometry, satelliteMesh);
  satellite.castShadow= true;
  scene.add(satellite);
  return satellite;
}

//Satellite: Satellite rotation
export function moveSatellite(i, satellite, scene){
    if (i < d.length){
        const pos_x = d[i]["Pos_x[m]"] / 1000;
        const pos_y = d[i]["Pos_y[m]"] / 1000;
        const  pos_z = d[i]["Pos_z[m]"] / 1000;
        if (i == 0){
            satellite.position.set(pos_x, pos_y, pos_z);
            scene.add(satellite)
        } else {
            satellite.position.set(pos_x, pos_y, pos_z);
        }
    }
}

//EARTH: Create earth model 
export function earthModel(scene){

    const earthRadius = 6378100/1000; //converts earth's radius from meters to km
    const earthTexture = new THREE.TextureLoader().load('src/Views/TimeGraphs/Images/earth_day.jpg');
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 32, 32);
    const earthMesh = new THREE.MeshBasicMaterial( {map: earthTexture});
    const earth = new THREE.Mesh(earthGeometry, earthMesh);
    earth.position.set(0,0,0);
    earth.castShadow = true;
    scene.add(earth);
    
    //Earth: Marker at Prime Meridian and Equator intersection
    const originGeometry = new THREE.BoxGeometry(100, 100, 75);
    const originMesh = new THREE.MeshPhongMaterial({color: '#ff0000'});
    const origin = new THREE.Mesh(originGeometry, originMesh);
    origin.position.set(earthRadius,0,0);
    scene.add(origin);
    
}