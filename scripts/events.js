import * as THREE from 'three';

const pointer = new THREE.Vector2( 0, 0 );

function init_resize_event(renderer, camera) {
    window.addEventListener("resize", (event)=>{
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();    
    })
}

function init_pointer_move_event(on_move) {
    window.addEventListener("pointermove", (event)=>{
        pointer.x =  event.clientX
        pointer.y = event.clientY
        on_move(event);
    })
} 


export { init_resize_event, init_pointer_move_event, pointer};