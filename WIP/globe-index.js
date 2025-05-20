const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Licht
const light = new THREE.AmbientLight(0xffffff); // wit licht
scene.add(light);

// Texture loader
const textureLoader = new THREE.TextureLoader();
textureLoader.load('earth.jpg', function (texture) {
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 5;

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();
});

// Voeg deze code toe in je globe-index.js, onder de initiële globe-opzet

// Laad de rampendata (je kunt dit later vervangen door een API-aanroep)
fetch('rampen.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(ramp => {
      // Voeg een marker toe voor elke ramp
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: ramp.color });
      const marker = new THREE.Mesh(geometry, material);

      // Plaats de marker op de juiste locatie (latitude, longitude)
      const latRad = THREE.MathUtils.degToRad(ramp.lat);
      const lonRad = THREE.MathUtils.degToRad(ramp.lon);

      marker.position.setFromSphericalCoords(50, latRad, lonRad);

      // Voeg de marker toe aan de scene
      scene.add(marker);

      // Maak de marker interactief
      marker.userData = ramp;  // Opslaan van rampdata in de marker

      // Raycast voor klikken (interactief)
      marker.on('click', () => {
        alert(`${ramp.type} in ${ramp.location} (${ramp.date})\nMagnitude: ${ramp.magnitude}`);
      });
    });
  })
  .catch(error => console.error('Error loading rampen data:', error));
// Voeg deze code toe in je globe-index.js, onder de initiële globe-opzet

// Laad de rampendata (je kunt dit later vervangen door een API-aanroep)
fetch('rampen.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(ramp => {
      // Voeg een marker toe voor elke ramp
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: ramp.color });
      const marker = new THREE.Mesh(geometry, material);

      // Plaats de marker op de juiste locatie (latitude, longitude)
      const latRad = THREE.MathUtils.degToRad(ramp.lat);
      const lonRad = THREE.MathUtils.degToRad(ramp.lon);

      marker.position.setFromSphericalCoords(50, latRad, lonRad);

      // Voeg de marker toe aan de scene
      scene.add(marker);

      // Maak de marker interactief
      marker.userData = ramp;  // Opslaan van rampdata in de marker

      // Raycast voor klikken (interactief)
      marker.on('click', () => {
        alert(`${ramp.type} in ${ramp.location} (${ramp.date})\nMagnitude: ${ramp.magnitude}`);
      });
    });
  })
  .catch(error => console.error('Error loading rampen data:', error));
