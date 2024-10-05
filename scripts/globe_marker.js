import * as THREE from 'three';

function create_marker(lat, lng, name) {
    const sphere = new THREE.SphereGeometry( 1, 32, 32 );
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const sphere_mesh = new THREE.Mesh( sphere, material );
    
    let radius = 100;
    let phi   = (90-lat)*(Math.PI/180),
    theta = (lng+180)*(Math.PI/180),
    x = -((radius) * Math.sin(phi)*Math.cos(theta)),
    z = ((radius) * Math.sin(phi)*Math.sin(theta)),
    y = ((radius) * Math.cos(phi));        

    sphere_mesh.position.set(x, y, z);

    return sphere_mesh;
}


export {create_marker};