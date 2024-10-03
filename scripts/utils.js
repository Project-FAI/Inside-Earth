import * as THREE from 'three'

function uv_to_geo_coordinates(uvx, uvy) {
    lat = uvy * 180 - 90;
    long = uvx * 360 - 180;

    return {
        lat,
        long
    }
}

function raycast_first_hit(scene, raycaster, camera, {x, y}) {
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const intersects = raycaster.intersectObjects(scene.children);
    
    if (intersects.length > 0) {
        return intersects[0];
    } else {
        return null;
    }
}


export { uv_to_geo_coordinates, raycast_first_hit }