// loaderSetup.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
export function loadTexture(url, callback) {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(url, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);

        texture.colorSpace = THREE.SRGBColorSpace;
    });
    if (callback) {
        callback(texture);
    }
};

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
export function initLoaders() {
    // Example: Initialize a GLTF Loader if you plan to use it
    const gltfLoader = new GLTFLoader();
    // You can load models here or return the loader for use elsewhere

    // Example: Initialize an RGBE Loader if you plan to use it
    const rgbeLoader = new RGBELoader();
    // Similar to the GLTFLoader, load HDR environments or return the loader

    // Return the loaders if you want to use them outside this function
    return { gltfLoader, rgbeLoader };
}
