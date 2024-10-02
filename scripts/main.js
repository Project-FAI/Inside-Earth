import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 0.1, 1000 );

const loader = new GLTFLoader();

let earth;
loader.load( 'assets/scene-v1.glb', function ( gltf ) {
    console.log(gltf.scene);
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );


    earth = gltf.scene.children[0];
    earth.position.x = -70;
    earth.position.y = -80

	scene.add( gltf.scene );


}, undefined, function ( error ) {

	console.error( error );

} );



const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.z = 1000;
function animate() {
	renderer.render( scene, camera );
    if (earth) {        
        earth.rotation.z += 0.0005;
    }
}

renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});