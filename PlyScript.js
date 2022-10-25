
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AnimationMixer } from './three/src/animation/AnimationMixer.js ';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
let container, stats;
let camera, cameraTarget, scene, renderer;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    //camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
    //camera.position.set( 3,0.15,3 );

    //cameraTarget = new THREE.Vector3( 0, - 0.1, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );


    // Ground

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );

    // Lights

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );

    //addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
    //addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );

    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );

    //renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );

    // camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set( 1,1, 3 );6

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = true;
    controls.target.set( 0, 0, 0 );
    controls.update();

    // stats

    stats = new Stats();
    container.appendChild( stats.dom );

    // resize

    window.addEventListener( 'resize', onWindowResize );

    // PLY file

    const loader = new PLYLoader();
    loadLoop(loader,scene);

}

async function loadLoop(loader,scene){
    let decode_url = "";
    for(let i=1051; i<1351; i++){
        // send request to server and ask for decoding
            let num_i = i.toString();
            let filename = "";
            decode_url = "";
            filename = filename.concat("/decoded/",num_i,".ply");
            decode_url = decode_url.concat("http://localhost:8080/",num_i,".drc");

            while(true){
                if(await resolveWait(decode_url)){
                    streamHologram(filename,loader,scene);
                    break;
                }
                else{
                    continue;
                }
            }
        }
}

function resolveWait(url) {
var oXHR = new XMLHttpRequest();

          oXHR.open("GET", url, true);

          oXHR.onreadystatechange = function (oEvent) {
              if (oXHR.readyState === 4) {
                  if (oXHR.status === 200) {
                    console.log(oXHR.responseText)
                  } else {
                     console.log("Error", oXHR.statusText);
                  }
              }
          };
      oXHR.send(null);
  return new Promise((resolve) => {
  setTimeout(function(){
      resolve(1);
  },400);

  });
}

function streamHologram (file, loader, scene){

    loader.load( file, function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial( { size: 0.01, vertexColors: true } );
        const mesh = new THREE.Points( geometry, material );

        mesh.position.x =  0;
        mesh.position.y =  0;
        mesh.position.z =  0;
        mesh.scale.multiplyScalar( 0.0006 );

        scene.add( mesh );
        setTimeout(function(){
            scene.remove(mesh);
        },700);

    });
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    render();
    stats.update();
    requestAnimationFrame( animate );

}

function render() {

    renderer.render( scene, camera );

}
