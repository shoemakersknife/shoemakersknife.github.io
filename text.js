function initSpinningText() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "background-canvas";
  document.body.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  const loader = new THREE.FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const geometry = new THREE.TextGeometry('welcome', {
      font: font,
      size: 0.5,
      height: 0.3,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.0002,
      bevelOffset: 0,
      bevelSegments: 5
    });

    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    const centerOffset = -0.5 * (boundingBox.max.x - boundingBox.min.x);
    geometry.translate(centerOffset, 0, 0);

    const material = new THREE.MeshStandardMaterial({ color: 0x98fb98 });
    const textMesh = new THREE.Mesh(geometry, material);
    scene.add(textMesh);

    textMesh.position.x = -4;  
    textMesh.position.y = 5;
    textMesh.position.z = 0;
    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      textMesh.rotation.y += 0.03;
      textMesh.rotation.x += 0;
      renderer.render(scene, camera);
    };

    animate();
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

initSpinningText();
