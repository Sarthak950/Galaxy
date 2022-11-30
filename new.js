import './style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import particle1 from './static//textures//particles//1.png';
import particle2 from './static//textures//particles//2.png';
import particle3 from './static//textures//particles//3.png';
import particle4 from './static//textures//particles//4.png';
import particle5 from './static//textures//particles//5.png';
import particle6 from './static//textures//particles//6.png';
import particle7 from './static//textures//particles//7.png';
import particle8 from './static//textures//particles//8.png';
import particle9 from './static//textures//particles//9.png';
import particle10 from './static//textures//particles//10.png';
import particle11 from './static//textures//particles//11.png';
import particle12 from './static//textures//particles//12.png';
import particle13 from './static//textures//particles//13.png';


// add a texture loadibng manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('onStart');
}
loadingManager.onLoad = () => {
    console.log('onLoad');
}
loadingManager.onProgress = () => {
    console.log('onProgress');
}
loadingManager.onError = () => {
    console.log('onError');
}
const textureLoader = new THREE.TextureLoader(loadingManager);

const particleTexture1 = textureLoader.load(particle1);
const particleTexture2 = textureLoader.load(particle2);
const particleTexture3 = textureLoader.load(particle3);
const particleTexture4 = textureLoader.load(particle4);
const particleTexture5 = textureLoader.load(particle5);
const particleTexture6 = textureLoader.load(particle6);
const particleTexture7 = textureLoader.load(particle7);
const particleTexture8 = textureLoader.load(particle8);
const particleTexture9 = textureLoader.load(particle9);
const particleTexture10 = textureLoader.load(particle10);
const particleTexture11 = textureLoader.load(particle11);
const particleTexture12 = textureLoader.load(particle12);
const particleTexture13 = textureLoader.load(particle13);


//resize manager
window.addEventListener('resize', () => {
    //update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// double click
window.addEventListener('dblclick', () => {
  
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

  if(!fullscreenElement) {
    if(canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if(canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

});

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth/window.innerHeight, 
  0.000001, 
  1000
);
scene.add(camera);
// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 4;    


//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const parameter = {
  count: 57100,
  size: 0.01,
  radius: 5,
  branches: 6,
  spin: 1,
  randomness: 0.447,
  randomnessPower: 1.23,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

let geometry = null
let material = null
let points =   null

const generateGalaxy = () =>{


  if( points !== null ){
    geometry.dispose();
    material.dispose();
    scene.remove(points); 
  }

  geometry = new THREE.BufferGeometry();

  const position = new Float32Array( parameter.count * 3 );
  const colors    = new Float32Array( parameter.count * 3 );

  const colorInside = new THREE.Color(parameter.insideColor);
  const colorOutside = new THREE.Color(parameter.outsideColor);

  for( let i=0; i<parameter.count; i++ ) {

    const i3 = i * 3;

    const radius = Math.random() * parameter.radius;
    const branchAngle = ((i % parameter.branches) / parameter.branches) * Math.PI * 2;
    const spinAngle = radius * parameter.spin;

    const randomX = Math.pow(Math.random(), parameter.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomY = Math.pow(Math.random(), parameter.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomZ = Math.pow(Math.random(), parameter.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

    position[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX * parameter.randomness;
    position[i3 + 1] = randomY * parameter.randomness;
    position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ * parameter.randomness;

    // color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameter.radius);
    // mixedColor.lerp(colorOutside, 0);

    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b

    // position[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius;
    // position[i3 + 1] = 0;
    // position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

    // const radius = Math.random() * 5;
    // const theta = Math.random() * Math.PI * 2;
    // const phi = Math.random() * Math.PI * 2;

    // position[i3] = Math.sin(theta) * Math.cos(phi) * radius;
    // position[i3 + 1] = Math.sin(theta) * Math.sin(phi) * radius;
    // position[i3 + 2] = Math.cos(theta) * radius;

  }

  geometry.setAttribute(
    'position', 
    new THREE.BufferAttribute(position, 3)
  );

  geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
  );
  material = new THREE.PointsMaterial({
    map: particleTexture1,
    size: parameter.size,
    // sizeAttenuation: false, 
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
    vertexColors: true,
  })

  points = new THREE.Points(geometry, material);
  scene.add(points);

};
generateGalaxy();


// gui
const gui = new dat.GUI();
gui.add(parameter, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy); 
gui.add(parameter, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameter, 'radius').min(0.001).max(20).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameter, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);
gui.add(parameter, 'spin').min(-1).max(1).step(0.0001).onChange(generateGalaxy);
gui.add(parameter, 'randomness').min(0).max(2).step(0.001).onChange(generateGalaxy);
gui.add(parameter, 'randomnessPower').min(1).max(10).step(0.001).onChange(generateGalaxy);
gui.add(parameter, 'insideColor').onChange(generateGalaxy);
gui.add(parameter, 'outsideColor').onChange(generateGalaxy); 


//clock
const clock = new THREE.Clock(); 
//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.enablePan = false;
// controls.enableZoom = false;
//animation 
function animate() {   
  requestAnimationFrame(animate); 
   
  const elapsedTime = clock.getElapsedTime(); 

  // make the galaxy spin
  points.rotation.y = elapsedTime * 0.1;

  controls.update();
  renderer.render(scene, camera); 
} 


animate(); 




// // particles 
// const particlesGeometry = new THREE.BufferGeometry();
// const count = 100000000;

// const position = new Float32Array(count * 3);

// class Particle {
//   constructor(x,y,z) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }
// } 

// function midPoint(p1, p2) {
//   return new Particle((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);
// }

// const dis = 7

// const p1 = new Particle(-5,0,0)
// const p2 = new Particle(2.5,4.330,0)
// const p3 = new Particle(2.5,-4.330,0)
// const pr = new Particle(dis * (Math.random() - 0.5),dis * (Math.random() - 0.5),dis * (Math.random() - 0.5));


// position[0] = p1.x
// position[1] = p1.y
// position[2] = p1.z

// position[3] = p2.x
// position[4] = p2.y
// position[5] = p2.z

// position[6] = p3.x
// position[7] = p3.y
// position[8] = p3.z

// position[9]  = pr.x
// position[10] = pr.y
// position[11] = pr.z

// for( let i = 12; i < count * 3; i+=3) {

//   const random = Math.floor(Math.random() * 3)

//   if(random === 0) {
//     pr.x = midPoint(pr, p1).x
//     pr.y = midPoint(pr, p1).y
//     pr.z = midPoint(pr, p1).z
//   }
//   if(random === 1) {
//     pr.x = midPoint(pr, p2).x
//     pr.y = midPoint(pr, p2).y
//     pr.z = midPoint(pr, p2).z
//   }
//   if(random === 2) {
//     pr.x = midPoint(pr, p3).x
//     pr.y = midPoint(pr, p3).y
//     pr.z = midPoint(pr, p3).z
//   }

//   position[i] = pr.x
//   position[i+1] = pr.y
//   position[i+2] = pr.z


// }

// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

// const particleMaterial = new THREE.PointsMaterial({
//     size: 0.00002,
//     // sizeAttenuation: false,
//     // alphaMap: particleTexture3, 
//     // transparent: true,
//     color: 'white'
// });
// const particles = new THREE.Points(particlesGeometry,particleMaterial)
// scene.add(particles);
