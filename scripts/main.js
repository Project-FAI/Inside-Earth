import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const loader = new GLTFLoader();

loader.load( 'assets/scene-v1.glb', function ( gltf ) {
    console.log(gltf.scene);
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    gltf.scene.scale.set( 1, 1, 1 );


	scene.add( gltf.scene );


}, undefined, function ( error ) {

	console.error( error );

} );



const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.z = 200;

function animate() {
	renderer.render( scene, camera );
    camera.rotation.z += 0.1
}

renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

