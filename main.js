import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});

camera.position.set(0, 2, 10);
const light = new THREE.HemisphereLight(0xffffff, 1000);
scene.add(light);
const bulb = new THREE.PointLight(0xffffff, 300);
scene.add(bulb);
bulb.position.set(21, 15, 22);
const bulb2 = new THREE.PointLight(0xffffff, 300);
scene.add(bulb2);
bulb2.position.set(-8, 15, 22);

//axishelper
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(0, 2, 0);
scene.add(axesHelper);
//axishelper

function introScene() {
  const texture = new THREE.TextureLoader().load("models/floor.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  scene.add(plane);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
function idle() {
  requestAnimationFrame(idle);
  renderer.render(scene, camera);

  camera.rotation.x = 0.8;
  //10 start for x to avoid texture clip, 30 for y is max to border.
  if (camera.position.y < 30) {
    camera.position.y += 0.01;
  }
  else{ camera.position.y = 0}
  camera.rotation.x += 0.001
  //camera.rotation.z += 0.001
}

function loadModel(modelname) {
  const loader = new GLTFLoader();
  loader.load(`models/${modelname}/scene.gltf`, function (gltf) {
    scene.add(gltf.scene);
    scene.position.set(0, 0, 0);
  });
}

camera.position.set(7, 0, 2);
introScene();
idle();

//transition between then dispose() floor
//animate();
//loadModel("black_lodge");
