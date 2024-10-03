import * as THREE from 'three';

import { loadScene } from './rendering.js';
import { identify_surface } from './surface_identification.js';
import * as events from './events.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 0.1, 1000 );
const light = new THREE.DirectionalLight( 0xffffff, 1 );


light.position.set( 1, 1, 1 ).normalize();

let theta = 0;

let earth;

scene.add( light );


loadScene('assets/scene-v1.glb').then(gltf=>{
    console.log(gltf.scene);


    earth = gltf.scene.children[0];
    earth.position.x = -70;
    earth.position.y = -80

	scene.add( gltf.scene );

});



const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.z = 1000;
function animate() {
	renderer.render( scene, camera );
    if (earth) {        
        earth.rotation.z += 0.0005;
    }

    if (events.has_pointer_moved) {
        console.log(events.raycast_first_hit(scene, new THREE.Raycaster(), camera, events.pointer));
        events.has_pointer_moved = false;
    }
}

renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

events.init_resize_event(renderer, camera);

window.addEventListener('click', (event)=>{
    
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    model = events.raycast_first_hit(scene, new THREE.Raycaster(), camera, {x, y});
})