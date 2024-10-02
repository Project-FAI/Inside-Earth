import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );

const loader = new GLTFLoader();

let earth;
loader.load( 'assets/scene-v1.glb', function ( gltf ) {
    console.log(gltf.scene);
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );


    earth = gltf.scene.children[0];
    earth.position.x = -100;

	scene.add( gltf.scene );


}, undefined, function ( error ) {

	console.error( error );

} );



const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.z = 1000;
function animate() {
	renderer.render( scene, camera );
    if (earth) {        
        earth.rotation.z += 0.001
    }
}

renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

document.addEventListener('keydown', function(event) {
    if(event.key == Key) {
        alert('Left was pressed');
    }
    else if(event.keyCode == 39) {
        alert('Right was pressed');
    }
});
