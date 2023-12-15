// utils.js

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
export function setPosition(object, position) {
    object.position.set(...position);
}
import * as THREE from 'three';

export function createTexturedMesh(geometry, textureUrl, callback) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(textureUrl, (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);

        if (callback) {
            callback(mesh);
        }
    });
}

// set position
export function setPosition(object, position) {
    object.position.set(...position);
}

// set rotation
export function setRotation(object, position) {
    object.rotation.set(...position);
}

// set Scale
export function setScale(object, scale) {
    object.scale.set(...scale);
}

// Apply material
export function applyMaterial(object, material) {
    object.material = material;
}

export function objectTexture(url) {
    const objectTexture = new THREE.TextureLoader().load(url);
    objectTexture.wrapS = THREE.RepeatWrapping;
    objectTexture.wrapT = THREE.RepeatWrapping;
    
    objectTexture.colorSpace = THREE.SRGBColorSpace;

    return objectTexture;

    };
