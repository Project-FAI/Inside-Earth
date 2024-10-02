import * as THREE from 'three';

import { loadScene } from './rendering.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 0.1, 1000 );
const light = new THREE.DirectionalLight( 0xffffff, 1 );
const raycaster = new THREE.Raycaster();

const water_tex = document.createElement('canvas');
const water_tex_ctx = water_tex.getContext('2d', {willReadFrequently: true});

window.onload = function() {
    console.log("loade windwos");
    
    const water_tex_img = document.querySelector('.water-texture');    
    water_tex.width = water_tex_img.width;
    water_tex.height = water_tex_img.height;
    const ctx = water_tex.getContext('2d');
    ctx.drawImage(water_tex_img, 0, 0);

}


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


    
    

}

renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

});

window.addEventListener('click', (event)=>{
    
    
    
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const intersects = raycaster.intersectObjects(scene.children);
    
    if (intersects.length > 0) {
        const uvx = intersects[0].uv.x;
        const uvy = intersects[0].uv.y;
        console.log(uvx * 360 - 180, uvy * 180 - 90);
        
        const x = Math.floor(uvx * water_tex.width);
        const y = Math.floor((1- uvy) * water_tex.height);

        console.log(x, y);
        
        const pix =  water_tex_ctx.getImageData(x, y, 1, 1).data[0];
        if (pix == 255) {
            alert("Water!")
        } else {
            alert("Land!")
        }
    }
})