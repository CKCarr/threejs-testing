/** FOR INDEX HTML - ART GALLERY */
import * as THREE from 'three';
import { PointerLockControls } from '/node_modules/three/examples/jsm/controls/PointerLockControls.js';
// // imports for add ons to THREE
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
console.log("THREE object is loaded 😄, here is the THREE object: ", THREE);

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

/////////////////////////////////////////////////////////////////////////////
// SCENE < > CAMERA
/////////////////////////////////////////////////////////////////////////////

// scene
const scene = new THREE.Scene();

// camera(fov(vision angle), aspectRatio(w/h), near, far)
const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near plane
    1000); // far plane

// renderer creates CANVAS sets size and adds element in DOM
const renderer = new THREE.WebGLRenderer( { antialias: true} );
renderer.setSize(window.innerWidth, window.innerHeight);
// set clear color to white
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

// add camera to scene
scene.add(camera);

// move the camera back 5 units on the z axis so we can see the scene position
camera.position.z = 15;

function onWindowResize() {
    // update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // update camera frustum
    camera.updateProjectionMatrix();
    // update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
/////////////////////////////////////////////////////////////////////////////
// SCENE LIGHTING
/////////////////////////////////////////////////////////////////////////////

// Set lighting parameters

// - to see the objects in the scene
// color, intensity (0-1), distance, decay - params for light
let ambientLight = new THREE.AmbientLight(0xffffff, 0.7);

// position the light - x, y, z - params for position of light
// not recommended to set camera position to light position
// ambient light is not affected by position it covers all objects in scene equally
scene.add(ambientLight);

// directional light - shines in a specific direction
// color, intensity, distance, decay
let directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
scene.add(directionalLight);

// set position to directional light - y axis above the scene - shines down
directionalLight.position.y = 10;

// set a pointer light to follow the camera around
// color, intensity, distance, decay
let pointerLight = new THREE.HemisphereLight(0xffffff, 1.0, 100);
pointerLight.position.set(0, 24, 0);
scene.add(pointerLight);



/////////////////////////////////////////////////////////////////////////////
// CREATE OBJECTS
/////////////////////////////////////////////////////////////////////////////

// Create an object

// creating a cube just to see the effects of the light
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({ color: 0x0002f1, roughness: 0.5, metalness: 0.8, emissive: 0x000000, emissiveIntensity: 0.5 });

const cube = new THREE.Mesh( geometry, material );

scene.add(cube);

//POLYHEDRON - a solid figure with many plane faces, typically more than six.
// const geometry = new THREE.PolyhedronGeometry( vertices, indices, radius, detail );
const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const geometryWorld = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 5, 20 );
const materialWorld = new THREE.MeshBasicMaterial( { color: 0x5f00ef, wireframe: true } );
const polyhedron = new THREE.Mesh( geometryWorld, materialWorld );
scene.add( polyhedron );

/////////////////////////////////////////////////////////////////////////////
// FLOOR with TEXTURES
/////////////////////////////////////////////////////////////////////////////

// add Textures to objects

// create texture for floor
    // const floorTexture = new THREE.TextureLoader().load('../images/artGallery1Index/marble.jpg');

    // const floorTexture = new THREE.TextureLoader().load('../images/artGallery1Index/metal_galvanised_grey_texture.jpg');

    // const floorTexture = new THREE.TextureLoader().load('../images/artGallery1Index/wood_floor.jpg');

    // const floorTexture = new THREE.TextureLoader().load('../images/artGallery1Index/herringbone_parquet_diff_1k.jpg');

    const floorTexture = new THREE.TextureLoader().load('../images/artGallery1Index/astronomy.png');

    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);

    floorTexture.colorSpace = THREE.SRGBColorSpace;

// create plane geometry
    const planeGeometry = new THREE.PlaneGeometry(50, 50);

    let planeMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
        roughness: 0.5
    });

    // create floor
    const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial)

    scene.add(floorPlane);

    // set position of floor
    floorPlane.rotation.x = Math.PI / -2; // 90 degree clockwise
    floorPlane.position.y = -Math.PI / 2; // 180 degree clockwise


/////////////////////////////////////////////////////////////////////////////
// CREATE WALLS - left wall, right wall, back wall, ceiling
/////////////////////////////////////////////////////////////////////////////

    const wallGroup = new THREE.Group(); // create a group to hold the walls
    scene.add(wallGroup)

    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 25, 0.001),
        new THREE.MeshBasicMaterial({color: 0xaf00af})
    );
    frontWall.position.z = -25;

    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 25, 0.01),
        new THREE.MeshBasicMaterial({color: 0x00afaf})
    );
    backWall.position.z = 25;

    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 25, 50),
        new THREE.MeshBasicMaterial({color: 0x00af02})
    );
    leftWall.position.x = 25;

    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 25, 50),
        new THREE.MeshBasicMaterial({color: 0xffaa02})
    );
    rightWall.position.x = -25;

    wallGroup.add(frontWall, leftWall, rightWall, backWall);

    // texture walls

function objectTexture(url) {
    const objectTexture = new THREE.TextureLoader().load(url);
    objectTexture.wrapS = THREE.RepeatWrapping;
    objectTexture.wrapT = THREE.RepeatWrapping;
    
    objectTexture.colorSpace = THREE.SRGBColorSpace;

    return objectTexture;

    };

    frontWall.material.map = objectTexture('../images/artGallery1Index/castle.jpg');

    backWall.material.map = objectTexture('../images/artGallery1Index/museum.jpg');

///////////////////////////////////////////////////////////////////////////////
// CEILING
//////////////////////////////////////////////////////////////////////////////

// // Image dimensions
// const widthOfImage = 50;
// const heightOfImage = 50;

// // Calculate the aspect ratio
// const imageAspectRatio = widthOfImage / heightOfImage;

// // Decide on the width or height you want your plane to be
// // This should be based on the scale of your scene
// const planeWidth = 80; // Example width
// const planeHeight = planeWidth / imageAspectRatio;

// // Create the plane geometry with the calculated width and height
// const ceilingGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

// // Load the texture
// const ceilingTexture = new THREE.TextureLoader().load('../images/artGallery1Index/astronomy.png');
// ceilingTexture.colorSpace = THREE.SRGBColorSpace;
// ceilingTexture.mapping = THREE.EquirectangularReflectionMapping; // This can help with the stretching

// // Create the material with the texture
// const ceilingMaterial = new THREE.MeshBasicMaterial({
//     map: ceilingTexture,
//     side: THREE.DoubleSide, // Visible from both sides (optional)
//     emissive: 0xffffff,     // Optional: to make the texture "glow" if desired
//     emissiveMap: ceilingTexture // Optional: only needed if you want the glow effect
// });

// // Create the mesh with the geometry and material
// const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

// // Add the mesh to the scene
// scene.add(ceilingPlane);

// // Set the position and rotation of the plane
// ceilingPlane.rotation.x = -Math.PI / 2; // Rotate to face downwards
// ceilingPlane.position.y = 10; // Adjust the height as necessary


// // create ceiling
// dome ceiling 
const radius = 50;
const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const ceilingTexture = new THREE.TextureLoader().load('../images/artGallery1Index/astronomy.png');
ceilingTexture.mapping = THREE.EquirectangularReflectionMapping;

const ceilingMaterial = new THREE.MeshBasicMaterial({
    map: ceilingTexture,
    side: THREE.DoubleSide,
    emissive: 0xffffff,
    emissiveMap: ceilingTexture
});
const heightOfWalls = 15;
const dome = new THREE.Mesh(sphereGeometry, ceilingMaterial);
dome.position.y = heightOfWalls;
scene.add(dome);




/////////////////////////////////////////////////////////////////////////////
// CREATE PAINTINGS 
/////////////////////////////////////////////////////////////////////////////

function createPainting(imageUrl, width, height, position) {
    const textureLoader = new THREE.TextureLoader();
    const paintingTexture = textureLoader.load(imageUrl);
    paintingTexture.colorSpace = THREE.SRGBColorSpace;

    const paintingGeometry = new THREE.PlaneGeometry(width, height);

    const paintingMaterial = new THREE. MeshBasicMaterial({
        map: paintingTexture,
        emissive: 0xffffff,
        emissiveMap: paintingTexture,
        side: THREE.DoubleSide,
    });
    
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);

    painting.position.set(position.x, position.y, position.z);
    

    return painting;
};

    const painting1 = createPainting(
        '../images/artGallery1Index/aigen-awe.png',
        8, 5,
        new THREE.Vector3(-10, 5, -24.99)
        );

    const painting2 = createPainting(
        '../images/artGallery1Index/museum.jpg',
        10, 5,
        new THREE.Vector3(10, 1 , -24.99)
    );

    // const painting3 = createPainting();

    scene.add(painting1, painting2);
/////////////////////////////////////////////////////////////////////////////
// ADD A BOUNDING BOX FOR COLLISIONS 
/////////////////////////////////////////////////////////////////////////////

for (let i = 0; i < wallGroup.children.length; i++) {
    wallGroup.children[i].BBox = new THREE.Box3();
    wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
};

/////////////////////////////////////////////////////////////////////////////
// CONTROLS
/////////////////////////////////////////////////////////////////////////////

// const controls = new PointerLockControls(camera, document.body);

// hide menu
function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}

// show menu
function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

// controls.addEventListener('unlock', showMenu);

// // mouse controls
// function startExperience() {
//     // lock the pointer
//     controls.lock();
    
//     // hide the menu
//     hideMenu();
// }

// // add event listener to play button
// const playButton = document.getElementById('playButton');
// playButton.addEventListener('click', startExperience);



// ADD CONTROLS TO MOVE with arrows and w, a, s, d
// WITH MOUSE - OrbitControls

// document.addEventListener('keydown', onKeyDown, false);

// // function to move camera with keyboard when key is pressed
// // 37 - left, 38 - down, 39 - right, 40 - up
// function onKeyDown(event) {
//     let keycode = event.which;

//     if(keycode === 39 || keycode === 68) // right arrow key +
//     {
//         // camera.translateX( 0.05 );
//         camera.rotateY( -0.10 );
//     }
//     if(keycode === 37 || keycode === 65) // left arrow key
//     {
//         // camera.translateX( -0.05 );
//         camera.rotateY( 0.10 );
//     }
//     if(keycode === 38 || keycode === 87) // up arrow key
//     {
//         camera.translateZ( -0.10 );
        
//     }
//     else if(keycode === 40 || keycode === 83) // down arrow key
//     {
//         camera.translateZ( 0.05 );
        
//     }
// }

// // ADD CONTROLS TO MOVE with mouse
// const cursorControls = new PointerLockControls(camera, renderer.domElement);
// renderer.domElement.addEventListener('click', () => {
//     if(cursorControls.isLocked === true) {
//             cursorControls.unlock();
//         } else {
//             cursorControls.lock();
//         }
// });
// cursorControls.addEventListener('lock', () => console.log('Pointer Locked.'));
// cursorControls.addEventListener('unlock', () => console.log('Pointer Unlocked.'));



/////////////////////////////////////////////////////////////////////////////
// ANIMATION
/////////////////////////////////////////////////////////////////////////////

// animation

// Render Loop - render the scene every time the screen is refreshed
// animate function is called 60 times per second
function animate() {
    requestAnimationFrame( animate );

    // // Set the position of the light to the camera's position
    // pointLight.position.copy(camera.position);

    // cube rotation - x, y, z
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rotate the dome about the vertical axis (Y-axis)
    dome.rotation.y += 0.0009; // Adjust the speed as needed

    // polyhedron rotation - x, y, z
    polyhedron.rotation.x += -0.001;
    polyhedron.rotation.y += -0.001;

    renderer.render( scene, camera );
}
animate();


// controls test 2
// Initialize PointerLockControls
const controls = new PointerLockControls(camera, document.body);

// Function to toggle pointer lock and menu display
function toggleControls() {
    if (controls.isLocked) {
        controls.unlock();
        showMenu();
    } else {
        controls.lock();
        hideMenu();
    }
}

// Event listeners for locking and unlocking the pointer
controls.addEventListener('lock', () => console.log('Pointer Locked.'));
controls.addEventListener('unlock', showMenu);

// Start the experience and lock controls
function startExperience() {
    controls.lock();
    hideMenu();
}

// Event listener for the play button
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', startExperience);

// Event listener for mouse click to toggle controls
document.addEventListener('click', toggleControls);

// Keydown event to handle movement
document.addEventListener('keydown', onKeyDown, false);


// function to move camera with keyboard when key is pressed
// 37 - left, 38 - down, 39 - right, 40 - up
function onKeyDown(event) {
    let keycode = event.which;

    if(keycode === 39 || keycode === 68) // right arrow key +
    {
        // camera.translateX( 0.05 );
        camera.rotateY( -0.10 );
    }
    if(keycode === 37 || keycode === 65) // left arrow key
    {
        // camera.translateX( -0.05 );
        camera.rotateY( 0.10 );
    }
    if(keycode === 38 || keycode === 87) // up arrow key
    {
        camera.translateZ( -0.10 );
        
    }
    else if(keycode === 40 || keycode === 83) // down arrow key
    {
        camera.translateZ( 0.05 );
        
    }
}
