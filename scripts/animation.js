// animation.js

import * as THREE from '../node_modules/three/build/three.module.js';

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
// Render Loop - render the scene every time the screen is refreshed
// animate function is called 60 times per second
export function animate(scene, camera, renderer, objects) {
    function render() {
    requestAnimationFrame( render );

    // // Set the position of the light to the camera's position
    // pointLight.position.copy(camera.position);

    if(objects.cube){
        // cube rotation - x, y, z
        objects.cube.rotation.x += 0.01;
        objects.cube.rotation.y += 0.01;
    }

    renderer.render( scene, camera );
    }
    render();
}
