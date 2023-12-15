// objects.js

import * as THREE from 'three';
// import { loadTexture } from './loadersSetup.js';
// import { setPosition, setRotation, setScale, createTexturedMesh } from './utils.js';

//////////////////////////////////////////////////////////////////////////////
// Bounding Box
//////////////////////////////////////////////////////////////////////////////

function setUpBoundingBox(object) {
    object.BBox = new THREE.Box3().setFromObject(object);
};

/////////////////////////////////////////////////////////////////////////////
// CREATE CUBE FOR TESTING
/////////////////////////////////////////////////////////////////////////////

// Define a function for creating a cube
function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshStandardMaterial({
        color: 0x0002f1,
        roughness: 0.5,
        metalness: 0.8,
        emissive: 0x000000,
        emissiveIntensity: 0.5
    });

    const cube = new THREE.Mesh(geometry, material);

    return cube;
}

/////////////////////////////////////////////////////////////////////////////
// CREATE FLOOR
/////////////////////////////////////////////////////////////////////////////

function floorPlane() {
    // Create texture for floor
    const floorTexture = new THREE.TextureLoader().load('../images/artGalleryImages/herringbone_parquet_diff_1k.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    floorTexture.colorSpace = THREE.SRGBColorSpace;

    // Create plane geometry
    const planeGeometry = new THREE.PlaneGeometry(50, 50);

    // Create plane material
    let planeMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
    });

    // Create floor plane
    const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

    // Set position and rotation of floor
    floorPlane.rotation.x = Math.PI / -2; // Lay the plane flat
    floorPlane.position.y = -Math.PI / 2; // Move the plane below the camera

    return floorPlane;
}


/////////////////////////////////////////////////////////////////////////////
// CREATE WALLS - left wall, right wall, back wall, ceiling
/////////////////////////////////////////////////////////////////////////////

function createWall(width, height, color, position, rotation){
    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(width, height);

    // Create plane material
    let material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
    });

    // Create wall plane
    const wall = new THREE.Mesh(geometry, material);

    // Set position and rotation of wall
    wall.position.set(position.x, position.y, position.z);
    wall.rotation.set(rotation.x, rotation.y, rotation.z);

    // set up bounding box
    setUpBoundingBox(wall);

    return wall;
};

/////////////////////////////////////////////////////////////////////////////
// CREATE PAINTINGS 
/////////////////////////////////////////////////////////////////////////////

// function createPainting(imageUrl, width, height, position, rotation) {
//     const textureLoader = new THREE.TextureLoader();
//     const paintingTexture = textureLoader.load(imageUrl);

//     const paintingGeometry = new THREE.PlaneGeometry(width, height);

//     const paintingMaterial = new THREE. MeshBasicMaterial({
//         map: paintingTexture,
//     });
    
//     const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);

//     painting.position.set(position.x, position.y, position.z);
//     painting.rotation.set(rotation.x, rotation.y, rotation.z);

//     return painting;
// };

// const painting = createPainting(
//     '../images'
// );

/////////////////////////////////////////////////////////////////////////////
// FUNCTION TO ADD OBJECTS TO SCENE
/////////////////////////////////////////////////////////////////////////////

// Main function to add objects to the scene
export async function addObjects(scene, uponLoad) {
    const cube = createCube(); // Synchronous
    scene.add(cube);

    const floor = await floorPlane(); // Asynchronous
    scene.add(floor);

    const leftWall = createWall(50, 10, 0xabcdef, { x: 15, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 });
    scene.add(leftWall);

    const rightWall = createWall(50, 10, 0xabcdef, { x: -15, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 });
    scene.add(rightWall);

    const frontWall = createWall(50, 10, 0x0aaaaa, { x: 0, y: 0, z: -25 }, { x: 0, y: 0, z: 0 });
    scene.add(frontWall);

    const backWall = createWall(50, 10, 0x0aaaaa, { x: 0, y: 0, z: 25 }, { x: 0, y: 0, z: 0 });
    scene.add(backWall);

    uponLoad({ cube, floor, leftWall, rightWall, frontWall});
}

