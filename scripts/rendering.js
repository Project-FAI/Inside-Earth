import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as TWEEN from './tween.js';
import { skybox_init } from './skybox.js';

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 0.1, 500000 );

const light = new THREE.DirectionalLight( 0xffffff, 1 );

const clock = new THREE.Clock();
const models = {
    earth: null,
}


let previousTime = 0;

function init() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    camera.position.z = 1000;

    loadScene('assets/scene-v1.glb').then(gltf=>{
        models.earth = gltf.scene.children[0];
        models.earth.position.set(0, 0, -4000);

        setTimeout(() => {
            TWEEN.tween(0, -70, 5000, (x)=>{
                models.earth.position.x = x;
            }, clock.getElapsedTime());
    
            TWEEN.tween(0, -80, 5000, (y)=>{
                models.earth.position.y = y;
            }, clock.getElapsedTime());
    
            TWEEN.tween(-4000, 0, 5000, (z)=>{
                models.earth.position.z = z;
            }, clock.getElapsedTime());
        }, 3000);

        // models.earth.position.x = -70;
        // models.earth.position.y = -80
    
        scene.add( gltf.scene );
        
    });
    
}

async function loadScene(path) {
    return await loader.loadAsync(path);
}

function update() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    renderer.render( scene, camera );

    if (models.earth) {
        models.earth.rotation.z += 0.1 * deltaTime;
    }

    console.log();
    TWEEN.update(elapsedTime);
}

function run() {
    renderer.setAnimationLoop(update);
}

export { init, loadScene, renderer, scene, camera, light, run};