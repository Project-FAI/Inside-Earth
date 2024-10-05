import * as THREE from 'three';
import progress_bar from './progress_bar.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as TWEEN from './tween.js';

let earth = null;

async function load_earth() {
    const model = await load_scene('assets/earth.glb');
    earth = model.scene.children[0].children[0].children[0].children[0];
    return earth    
}

function start_zoom_in(timeStamp, duration) {
    new TWEEN.Tween(earth.position, {x: -70, y: -80, z: 0}, 5)
    .onUpdate(({x, y, z})=>{
        earth.position.set(x, y, z);
    })
    .withEaseFuntion(TWEEN.Tween.QuadraticEaseOut)
    .start(timeStamp);
}


async function load_scene(path) {
    const loader = new GLTFLoader();
    const load = await loader.loadAsync(path, (progress)=>{
        progress_bar.show(progress.loaded / progress.total)
    });
    progress_bar.hide();
    return load;
}

export {load_earth, start_zoom_in};