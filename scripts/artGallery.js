/** FOR INDEX HTML - ART GALLERY */
// console log for inspector to see if THREE is loaded
console.log("THREE object is loaded 😄, here is the THREE object: ", THREE)
import * as THREE from 'three';

import { initScene } from './sceneSetup.js';
import { initControls } from './controls.js';
import { addObjects } from '/objects.js';
import { animate } from './animation.js';
// import { initLoaders } from './loadersSetup.js';

/**
 * STEPS TO CREATE A THREE.JS SCENE
 * 1. Create a scene
 * 2. Create a camera
 * 3. Create a renderer
 * 4. Add camera to scene
 * 5. Add renderer to DOM
 * 6. Add objects to scene
 * 7. Render scene
 * 8. Animate scene
 * 
 */

// //////////////////////////////////////////////////////////////////////////////
function onWindowResize() {
    // update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // update camera frustum
    camera.updateProjectionMatrix();
    // update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);


// Initialize the scene, camera, and renderer
const { scene, camera, renderer } = initScene();
console.log(scene, camera, renderer); // Check if these are defined

// Initialize controls
initControls(camera, renderer);

// Add objects to the scene and receive any objects that might be needed for animation
// // Call addObjects and handle the asynchronous operation
addObjects(scene, (objects) => {
    animate(scene, camera, renderer, objects);
}).catch(error => {
    console.error('An error occurred loading objects:', error);
});

