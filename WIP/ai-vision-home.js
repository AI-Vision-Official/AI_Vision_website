const parallax = document.getElementById('parallax');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  parallax.style.backgroundPosition = `${x}% ${y}%`;
});
const logo = document.querySelector('.banner-image');

document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 30;
  const y = (window.innerHeight / 2 - e.pageY) / 30;
  logo.style.transform = `translate(${x}px, ${y}px)`;
});

// script.js
let scene, camera, renderer, globe;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globe').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077cc, wireframe: true });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;
    renderer.render(scene, camera);
}

init();

// JavaScript - continenten plaatsen
const continents = [
  { name: "Africa", position: { x: 1.5, y: 0, z: 0 } },
  { name: "Europe", position: { x: -1.5, y: 0, z: 0 } },
  { name: "Asia", position: { x: 0, y: 1.5, z: 0 } },
  { name: "North America", position: { x: -1.5, y: 1.5, z: 0 } },
  { name: "South America", position: { x: 1, y: -1.5, z: 0 } },
  // Voeg andere continenten toe als nodig
];

continents.forEach((continent) => {
  const continentElement = document.createElement('div');
  continentElement.classList.add('continent');
  continentElement.style.transform = `translate3d(${continent.position.x * 100}px, ${continent.position.y * 100}px, ${continent.position.z * 100}px)`;

  continentElement.addEventListener('mouseenter', () => {
      continentElement.style.backgroundColor = 'rgba(0, 255, 255, 1)';
      continentElement.style.transform = 'scale(1.3)';
  });

  continentElement.addEventListener('mouseleave', () => {
      continentElement.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
      continentElement.style.transform = 'scale(1)';
  });

  document.getElementById('continents').appendChild(continentElement);
});

// Continenten dynamisch genereren en toevoegen aan de wereldbol
continents.forEach((continent) => {
  const continentElement = document.createElement('div');
  continentElement.classList.add('continent');
  continentElement.style.transform = `translate3d(${continent.position.x * 100}px, ${continent.position.y * 100}px, ${continent.position.z * 100}px)`;

  continentElement.addEventListener('mouseenter', () => {
      continentElement.style.backgroundColor = 'rgba(0, 255, 255, 1)';
      continentElement.style.transform = 'scale(1.3)';
  });

  continentElement.addEventListener('mouseleave', () => {
      continentElement.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
      continentElement.style.transform = 'scale(1)';
  });

  document.getElementById('continents').appendChild(continentElement);
});
