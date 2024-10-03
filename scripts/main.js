import * as THREE from 'three';

import { loadScene } from './rendering.js';
import { identify_surface } from './surface_identification.js';
import * as events from './events.js';
import * as utils from './utils.js'
import * as renderer from './rendering.js'

const main_page = document.querySelector('.main-page');
const landing_page = document.querySelector('.landing-page');
const play_button = document.querySelector('.play-button');


main_page.appendChild( renderer.renderer.domElement );

events.init_resize_event(renderer.renderer, renderer.camera);

play_button.addEventListener('click', (event)=>{
    landing_page.style.opacity = 0;
    
    main_page.style.visibility = 'visible';
    renderer.init();
    renderer.run();
})