import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// extra
const uiContainer = document.createElement('div');
uiContainer.style.cssText = `
    position: absolute;
    top: 20px;
    left: 20px;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 15px;
    border-radius: 8px;
    user-select: none;
    z-index: 100;
`;
uiContainer.innerHTML = `
    <div style="margin-bottom: 10px; font-size: 16px; font-weight: bold;"> Controls</div>
    <div style="margin-bottom: 5px;">Speed: <span id="speedValue">1.0x</span></div>
    <input type="range" id="speedSlider" min="0" max="5" step="0.1" value="1" style="width: 200px;">
    <div style="margin-top: 10px; font-size: 12px; opacity: 0.8;">
        • Drag to rotate view<br>
        • Scroll to zoom <br>
        • Spacebar to reset camera
    </div>
`;
document.body.appendChild(uiContainer);

const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
let simulationSpeed = 1.0;

speedSlider.addEventListener('input', (e) => {
    simulationSpeed = parseFloat(e.target.value);
    speedValue.textContent = simulationSpeed.toFixed(1) + 'x';
});

const sunLight = new THREE.PointLight(0xffffff, 2, 200);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

// === STARFIELD ===
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.7,
    sizeAttenuation: true
});

const starsVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);




// === SUN  ===
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('sun.jpg');

const sunGeometry = new THREE.SphereGeometry(15, 128, 128);
const sunMaterial = new THREE.MeshBasicMaterial({ 
    map: sunTexture, 
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const glowGeometry = new THREE.SphereGeometry(6, 128, 128);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFAA00,
    transparent: true,
    opacity: 0.3,
    side: THREE.BackSide
});
const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
sun.add(sunGlow);




// MERCURY (0.38 Earth radii)
const mercuryDistance = 20;

const mercuryGeometry = new THREE.SphereGeometry(0.38, 16, 16);
const mercuryMaterial = new THREE.MeshStandardMaterial({color: 0x8C7853});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);

// VENUS (0.95 Earth radii)
const venusDistance = 28;


const venusGeometry = new THREE.SphereGeometry(0.95, 20, 20);
const venusMaterial = new THREE.MeshStandardMaterial({color: 0xFFA500});
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);

// EARTH (1.0 Earth radii - ref)
const earthDistance = 35;
//const earthOrbit = createOrbit(earthDistance, 0x4169E1);
//scene.add(earthOrbit);

const earthGeometry = new THREE.SphereGeometry(1, 20, 20);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// MARS (0.53 Earth radii)
const marsDistance = 43;
//const marsOrbit = createOrbit(marsDistance);
//scene.add(marsOrbit);

const marsGeometry = new THREE.SphereGeometry(0.53, 16, 16);
const marsMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500 });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// JUPITER (11.2 Earth radii)
const jupiterDistance = 60;
//const jupiterOrbit = createOrbit(jupiterDistance);
//scene.add(jupiterOrbit);

const jupiterGeometry = new THREE.SphereGeometry(5.6, 32, 32);
const jupiterMaterial = new THREE.MeshStandardMaterial({ color: 0xDAA520 });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);

// SATURN (9.45 Earth radii)
const saturnDistance = 80;
//const saturnOrbit = createOrbit(saturnDistance);
//scene.add(saturnOrbit);

const saturnGeometry = new THREE.SphereGeometry(4.7, 32, 32);
const saturnMaterial = new THREE.MeshStandardMaterial({ color: 0xFAD5A5 });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn);

// Saturn's rings
const ringGeometry = new THREE.RingGeometry(6.5, 10, 32);
const ringMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xC0C0C0, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
});
const saturnRings = new THREE.Mesh(ringGeometry, ringMaterial);
saturnRings.rotation.x = Math.PI / 2;
saturn.add(saturnRings);

// URANUS (4.0 Earth radii)
const uranusDistance = 100;
//const uranusOrbit = createOrbit(uranusDistance);
//scene.add(uranusOrbit);

const uranusGeometry = new THREE.SphereGeometry(2.0, 20, 20);
const uranusMaterial = new THREE.MeshStandardMaterial({color: 0x4FD0E7});
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
scene.add(uranus);

// NEPTUNE (3.88 Earth radii)
const neptuneDistance = 120;
//const neptuneOrbit = createOrbit(neptuneDistance);
//scene.add(neptuneOrbit);

const neptuneGeometry = new THREE.SphereGeometry(1.94, 20, 20);
const neptuneMaterial = new THREE.MeshStandardMaterial({color: 0x4169E1});
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
scene.add(neptune);

// === ORBIT VARIABLES ===
let mercuryAngle = 0;
const mercurySpeed = 0.040;

let venusAngle = Math.PI/4;
const venusSpeed = 0.032;

let earthAngle = 0;
const earthSpeed = 0.025;

let marsAngle = Math.PI;
const marsSpeed = 0.020;

let jupiterAngle = Math.PI / 2;
const jupiterSpeed = 0.012;

let saturnAngle = 0;
const saturnSpeed = 0.009;

let uranusAngle = Math.PI/3;
const uranusSpeed = 0.006;

let neptuneAngle = Math.PI/6;
const neptuneSpeed = 0.004;

// === MOUSE CONTROLS ===
let mouseX = 0, mouseY = 0;
let isMouseDown = false;
let cameraAngleX = 0, cameraAngleY = 0;
let cameraDistance = 50;

document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.addEventListener('mousemove', (event) => {
    if (!isMouseDown) return;
    
    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;
    
    cameraAngleX += deltaX * 0.01;
    cameraAngleY += deltaY * 0.01;
    
    cameraAngleY = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraAngleY));
    
    mouseX = event.clientX;
    mouseY = event.clientY;
});

document.addEventListener('wheel', (event) => {
    cameraDistance += event.deltaY * 0.1;
    cameraDistance = Math.max(10, Math.min(200, cameraDistance));
    event.preventDefault();
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        cameraAngleX = 0;
        cameraAngleY = 0;
        cameraDistance = 50;
        event.preventDefault();
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// === ANIMATION LOOP ===
function animate() {
    camera.position.x = Math.cos(cameraAngleX) * cameraDistance;
    camera.position.z = Math.sin(cameraAngleX) * cameraDistance;
    camera.position.y = Math.sin(cameraAngleY) * cameraDistance + 10;
    camera.lookAt(0, 0, 0);
    
    sun.rotation.y += 0.005;
    
    mercuryAngle += mercurySpeed * simulationSpeed;
    mercury.position.x = Math.cos(mercuryAngle) * mercuryDistance;
    mercury.position.z = Math.sin(mercuryAngle) * mercuryDistance;
    mercury.rotation.y += 0.03 * simulationSpeed;
    
    venusAngle += venusSpeed * simulationSpeed;
    venus.position.x = Math.cos(venusAngle) * venusDistance;
    venus.position.z = Math.sin(venusAngle) * venusDistance;
    venus.rotation.y += 0.015 * simulationSpeed;
    
    earthAngle += earthSpeed * simulationSpeed;
    earth.position.x = Math.cos(earthAngle) * earthDistance;
    earth.position.z = Math.sin(earthAngle) * earthDistance;
    earth.rotation.y += 0.02 * simulationSpeed;
    
    marsAngle += marsSpeed * simulationSpeed;
    mars.position.x = Math.cos(marsAngle) * marsDistance;
    mars.position.z = Math.sin(marsAngle) * marsDistance;
    mars.rotation.y += 0.018 * simulationSpeed;
    
    jupiterAngle += jupiterSpeed * simulationSpeed;
    jupiter.position.x = Math.cos(jupiterAngle) * jupiterDistance;
    jupiter.position.z = Math.sin(jupiterAngle) * jupiterDistance;
    jupiter.rotation.y += 0.04 * simulationSpeed;
    
    saturnAngle += saturnSpeed * simulationSpeed;
    saturn.position.x = Math.cos(saturnAngle) * saturnDistance;
    saturn.position.z = Math.sin(saturnAngle) * saturnDistance;
    saturn.rotation.y += 0.038 * simulationSpeed;
    
    uranusAngle += uranusSpeed * simulationSpeed;
    uranus.position.x = Math.cos(uranusAngle) * uranusDistance;
    uranus.position.z = Math.sin(uranusAngle) * uranusDistance;
    uranus.rotation.y += 0.025 * simulationSpeed;
    
    neptuneAngle += neptuneSpeed * simulationSpeed;
    neptune.position.x = Math.cos(neptuneAngle) * neptuneDistance;
    neptune.position.z = Math.sin(neptuneAngle) * neptuneDistance;
    neptune.rotation.y += 0.020 * simulationSpeed;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();