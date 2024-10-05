import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as earth_hover from './earth_hover.js'
import { start_zoom_in, load_earth }  from './earth.js'
import * as globe_marker from './globe_marker.js'
import * as TWEEN from './tween.js'

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 100, 500000 );
const raycaster = new THREE.Raycaster();

const light = new THREE.DirectionalLight( 0xffffff, 1 );

const clock = new THREE.Clock();
const models = {
    earth: null,
    sphere : null
}

let check_for_hover = false;
let hasPointerMoved = false;

let previousTime = 0;

function init() {
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );
    
    camera.position.z = 1000;
        
    load_earth().then((earth)=>{
        scene.add(earth);
        models.earth = earth;
        earth.position.set(0, 0, -4000);

        console.log(models.earth);
        
        models.earth.rotation.set(0, 0, 0);
        models.earth.scale.set(1, 1, 1);
        models.earth.children[0].scale.set(100, 100, 100);
        models.earth.children[0].rotation.set(-Math.PI / 2, 0, 0);
        
        earth_hover.init(renderer.domElement, scene, raycaster, camera, models.earth.children[0]);

        setTimeout(()=>{
            start_zoom_in(clock.getElapsedTime(), 5);    
        }, 3000)
        setTimeout(() => {
            check_for_hover = true;
        }, 8000);

        renderer.domElement.style.opacity = 1;
    });

        
    
}

function update() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    renderer.render( scene, camera );

    if (models.earth) {
        models.earth.rotation.y += 0.1 * deltaTime;
    }

    if (check_for_hover) {
        earth_hover.check_hover(scene, raycaster, camera);
    }

    console.log();
    // TWEEN.update(elapsedTime);
    TWEEN.Tween.update(elapsedTime);
}

function on_pointer_move(event) {
    hasPointerMoved = true;
}

function run() {
    renderer.setAnimationLoop(update);
}

export { init, renderer, scene, camera, light, run, on_pointer_move};