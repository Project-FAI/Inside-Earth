import * as THREE from 'three';

import { identify_surface } from './surface_identification.js';
import * as events from './events.js';
import * as utils from './utils.js'
import * as renderer from './rendering.js'

const main_page = document.querySelector('.main-page');
const landing_page = document.querySelector('.landing-page');
const play_button = document.querySelector('.play-button');
const main_video = document.querySelector('.main-video');

main_page.appendChild( renderer.renderer.domElement );

events.init_resize_event(renderer.renderer, renderer.camera);
events.init_pointer_move_event(renderer.on_pointer_move);

if (localStorage.getItem('has_seen_intro')) {
    landing_page.style.display = 'none';
    main_page.style.visibility = 'visible';
    renderer.init();
    renderer.run();
} else {
    landing_page.style.display = 'flex';
}


play_button.addEventListener('click', (event)=>{
    main_video.style.display = 'block';
    main_video.play();

})

main_video.addEventListener('ended', (event)=>{
    landing_page.style.opacity = 0;
        setTimeout(() => {
        landing_page.style.display = 'none';
    }, 1000);

    main_page.style.visibility = 'visible';
    renderer.init();
    renderer.run();

    localStorage.setItem('has_seen_intro', true);

})
