import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const renderer = new THREE.WebGLRenderer({antialias: true});
const loader = new GLTFLoader();

function init() {
    renderer.setSize( window.innerWidth, window.innerHeight );

}

async function loadScene(path) {
    return await loader.loadAsync(path);
}

export { init, loadScene };