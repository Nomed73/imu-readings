import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';



const GettingStarted = () => {
    const containerRef = useRef(null);
    
    useEffect(() => {

        // Create Scene
        const scene = new THREE.Scene();
        scene.backgroundColor = 0xffffff;
        scene.fog = new THREE.Fog(0xffffff, 0.0025, 50);
        
        //Add Axes - optional 
        const axes = new THREE.AxesHelper(10);
        scene.add(axes);

        // camera and renderer
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -3;
        camera.position.z = 8;
        camera.position.y = 2;

        //setup renderer and attach to canvas
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.shadowMap.enabled = true;
        renderer.shadowMap. type = THREE.VSMShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff);
        containerRef.current.appendChild(renderer.domElement);

        // add lights
        scene.add(new THREE.AmbientLight(0x666666));
        const dirLight = new THREE.DirectionalLight(0xaaaaaa);
        dirLight.position.set(5,12,8);
        dirLight.castShadow = true;
        scene.add(dirLight)

        //Creata a cube
        const cubeGeometry = new THREE.BoxGeometry();
        const cubeMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = -2;
        cube.position.z = 0;
        cube.position.y = 0;
        cube.castShadow = true;
        scene.add(cube);

        // Create a torus know
        const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 100);
        const torusKnotMat = new THREE.MeshStandardMaterial({color: 0x00ff88, roughness: 0.1});
        const torus = new THREE.Mesh(torusKnotGeometry, torusKnotMat);
        torus.castShadow = true;
        torus.position.x = 2;
        torus.position.z = 0;
        torus.position.y = 0;
        scene.add(torus);

        // Create a large plane and ground
        const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
        const groundMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.position.set(0, -2, 0);
        ground.rotation.set(Math.PI / -2, 0, 0);
        ground.receiveShadow = true;
        scene.add(ground);

        //Floating GUI
        const gui = new GUI();
        const props = {
            cubeSpeed: 0.01,
            torusSpeed: 0.01,
        };
        gui.add(props, 'cubeSpeed', -.2, .2, 0.01);
        gui.add(props, 'torusSpeed', -0.2, 0.2, 0.01);

        //animate
        let step = 0;
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        function animate(){
            requestAnimationFrame(animate);
            step += 0.01;
            // cube.position.x = 4*(Math.cos(step));
            // cube.position.y = 4*Math.abs(Math.sin(step));
            // cube.rotation.x += props.cubeSpeed;
            // cube.rotation.z += props.cubeSpeed;
            cube.rotation.y += props.cubeSpeed
            torus.rotation.x -= props.torusSpeed;
            torus.rotation.z -= props.torusSpeed;
            torus.rotation.y += props.torusSpeed;
            orbitControls.update()
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            // window.removeEventListener('resize', handleResize);
            containerRef.current.removeChild( renderer.domElement)
          };

    }, []);
return <div ref={containerRef}></div>
};

export default GettingStarted;