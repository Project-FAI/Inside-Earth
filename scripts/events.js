import * as THREE from 'three';

const pointer = new THREE.Vector2( 0, 0 );
let has_pointer_moved = true;

function init_resize_event(renderer, camera) {
    window.addEventListener("resize", (event)=>{
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();    
    })
}

window.addEventListener("pointermove", (event)=>{
    pointer.x =  (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    has_pointer_moved = true;

})

export { init_resize_event, pointer, has_pointer_moved };