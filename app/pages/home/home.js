import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(_navController) {
    this._navController = _navController;
  }

  /*
    pushPage(){
      this._navController.push(SomeImportedPage, { userId: "12345"});
    }
  */
  delThreeSample(){
    var container = document.getElementById( 'three' );
    container.innerHTML="";
  }
  loadThreeSample() {
    var camera, scene, renderer;
    var effect, controls;
    var mesh,container;
    var SCREEN_WIDTH = window.innerWidth*0.9;
    var SCREEN_HEIGHT = window.innerHeight/2;
    init();
    animate();

    function init() {
      container = document.getElementById( 'three' );
      console.log(container.innerHTML);

      camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1100 );
      camera.position.set(0.1,0.1,0.1);
      camera.target = new THREE.Vector3( 0, 0, 0 );

      scene = new THREE.Scene();

      var geometry = new THREE.SphereGeometry( 500, 60, 40 );
      geometry.scale( - 1, 1, 1 );

      var material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( 'img/3.jpg' )
      } );

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
      container.appendChild( renderer.domElement );

      effect = new THREE.StereoEffect(renderer);
        //
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;

      function setOrientationControls(e) {
           if (!e.alpha) {
             return;
           }

          controls = new THREE.DeviceOrientationControls(camera, true);
          controls.connect();

          renderer.domElement.addEventListener('click', fullscreen, false);

          window.removeEventListener('deviceorientation', setOrientationControls, true);
        }
        window.addEventListener('deviceorientation', setOrientationControls, true);
      window.addEventListener( 'resize', onWindowResize, false );
    }
    function fullscreen() {
        SCREEN_WIDTH = window.innerWidth*0.9;
        SCREEN_HEIGHT = window.innerHeight/2;
          if (container.requestFullscreen) {
            container.requestFullscreen();
          }else if (container.msRequestFullscreen) {
              container.msRequestFullscreen();
          }else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
          }else if (container.webkitRequestFullscreen) {
              container.webkitRequestFullscreen();
          }
    }
    function onWindowResize() {
        SCREEN_WIDTH = window.innerWidth*0.9;
        SCREEN_HEIGHT = window.innerHeight/2;
        camera.aspect = SCREEN_WIDTH/ SCREEN_HEIGHT;
        camera.updateProjectionMatrix();

        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        effect.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    }

    function animate() {
        requestAnimationFrame( animate );
        update();
    }
    function update() {
        controls.update();
        //renderer.render( scene, camera );
        effect.render(scene, camera);
    }
  }

}
