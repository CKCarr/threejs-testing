/** JS for src/loader.html */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { objectTexture } from './modularGallery/utility'; 


class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.set( 0, 0, 4 );
        
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( objectTexture('images/artGallery1Index/astronomy.png'));

		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
		this.scene.add(ambient);
        
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        directionalLight.position.set( 0.3, 1, 1);
        this.scene.add(directionalLight);
        
        const light = new THREE.PointLight(0xFFFFFF, 0.8);
        light.position.set(0.9, 1, 1);
        this.scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        ambientLight.position.set(0.3, 1, 1);
        this.scene.add(ambientLight);


		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( this.renderer.domElement );
		
        //Replace Box with Circle, Cone, Cylinder, Dodecahedron, Icosahedron, Octahedron, Plane, Sphere, Tetrahedron, Torus or TorusKnot
        const geometry = new THREE.TorusKnotGeometry();
        //const geometry = this.createStarGeometry();

        // const material = new THREE.MeshStandardMaterial( { color: 0x577cd4 });

        const material = new THREE.MeshStandardMaterial( { color: 0x577cd4, wireframe: false, WireFrameLineWidth: 1, metalness: 10, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.02, side: THREE.TwoPassDoubleSide, flatShading: true, transparent: false, opacity: 10, lightMapIntensity: 100, reflectivity: 0.5, refractionRatio: 0.5, envMapIntensity: 0.5 });

        this.mesh = new THREE.Mesh( geometry, material );
        
        this.scene.add(this.mesh);
        
        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        
        this.renderer.setAnimationLoop(this.render.bind(this));
    
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    createStarGeometry(innerRadius=0.4, outerRadius=0.8, points=5){
        
    }

    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {   
        this.mesh.rotateY( 0.01 );
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };
