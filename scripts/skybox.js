import * as THREE from 'three';
import { scene } from './rendering.js';

function createPathStrings(filename) {
    const basePath = "./assets/skybox/";
    const baseFilename = basePath + filename;
    const fileType = ".png";
    const sides = ["front", "back", "top", "bottom", "right", "left"];
    const pathStings = sides.map(side => {
        return baseFilename + "_" + side + fileType;
    });
    
    return pathStings;
}
    
    
function createMaterialArray(filename) {
    const skyboxPaths = createPathStrings(filename);
    const materialArray = skyboxPaths.map(image => {
        let texture = new THREE.TextureLoader().load(image);

        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---              
    });

    return materialArray
}

function skybox_init() {
    const materialArray = createMaterialArray("");
    const skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
    const skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.rotation.x = Math.PI / 2;
    //darker
    skybox.material.forEach(m => {
        m.color.setRGB(0.1, 0.1, 0.1);
    });
    return skybox;

}

export {skybox_init}