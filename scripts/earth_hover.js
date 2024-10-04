import { raycast_first_hit } from "./utils.js";
import { pointer } from "./events.js";
import { identify_surface } from "./surface_identification.js";

const popup = document.querySelector('.popup-window');
const popup_header = document.querySelector('.popup-header');
const popup_content = document.querySelector('.popup-content');

const data = {
    canvas: null,
    scene: null,
    raycaster: null,
    camera: null
}

function init(canvas, scene, raycaster, camera) {
    data.canvas = canvas;
    data.scene = scene;
    data.raycaster = raycaster;
    data.camera = camera;
}

function display_popup(title, text) {
    popup_header.innerText = title;
    popup_content.innerText = text;

    // mouse coordinates    
    popup.style.left = pointer.x + 2 + "px";
    // top should subtract the height of the popup

    popup.style.top = pointer.y - popup.clientHeight - 2 + "px";

    console.log(pointer.x);
    

    popup.style.display = "block";
}

function hide_popup() {
    popup.style.display = "none";
}

let prev_surface = null;

function check_hover() {

    const x = pointer.x / window.innerWidth * 2 - 1;
    const y = -pointer.y / window.innerHeight * 2 + 1;
    
    let hit = raycast_first_hit(data.scene, data.raycaster, data.camera, {x, y});
    if (hit) {

        data.canvas.style.cursor = "pointer";

        const surface =  identify_surface(hit.uv.x, hit.uv.y) 
        if (surface == "water" && prev_surface != "water") {
            display_popup("Water", "Most of Earth's surface is ocean water: 70.8% or 361 million km2. This vast pool of salty water is often called the world ocean, and makes Earth with its dynamic hydrosphere a water world.");
        } else {
            display_popup("Land", "Land is the solid terrestrial surface of Earth. It makes up 29.2% of Earth's surface and includes all continents and islands.");
        }
    } else {
        hide_popup();
        data.canvas.style.cursor = "default";
    }
}

export { check_hover, init } 