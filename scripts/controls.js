// controls.js
import { PointerLockControls } from './three/examples/jsm/controls/PointerLockControls.js';

//////////////////////////////////////////////////////////////////////////////
// Pointer Lock Controls - Key bindings for camera movement
//////////////////////////////////////////////////////////////////////////////
export function initControls(camera, renderer) {


    const cursorControls = new PointerLockControls(camera, renderer.domElement);

    // function to toggle pointer lock state
    function togglePointerLock() {
        if(cursorControls.isLocked === true) {
            cursorControls.unlock();
        } else {
            cursorControls.lock();
        }
    }

    // Add event listener to lock the pointer
    renderer.domElement.addEventListener('click', togglePointerLock);

    cursorControls.addEventListener('lock', () => console.log('Pointer Locked.'));
    cursorControls.addEventListener('unlock', () => console.log('Pointer Unlocked.'));

    // Set the camera to be able to move with the keyboard
    // Add the event listener for keydown
    document.addEventListener('keydown', onKeyDown, false);

    // Function to move camera with keyboard when key is pressed
    // 37 - left, 38 - up, 39 - right, 40 - down
    function onKeyDown(event) {
        let keycode = event.which;

        // Right arrow key or 'D' key
        if(keycode === 39 || keycode === 68) {
            camera.translateX(-0.05);
        }
        // Left arrow key or 'A' key
        if(keycode === 37 || keycode === 65) {
            camera.translateX(0.05);
        }
        // Up arrow key or 'W' key
        if(keycode === 38 || keycode === 87) {
            camera.translateY(-0.05);
        }
        // Down arrow key or 'S' key
        else if(keycode === 40 || keycode === 83) {
            camera.translateY(0.05);
        }
    };
    return cursorControls;
}

//////////////////////////////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////////////////////////////


