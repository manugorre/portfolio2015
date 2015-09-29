'use strict';

var socket = io();

var _content = document.getElementsByClassName('content')[0];
var _global  = document.getElementById('global');
var _body    = document.getElementsByTagName('body')[0];

var _canvasContent = document.getElementsByClassName('canvasContent')[0];

var winInW = window.innerWidth;
var winInH = window.innerHeight;

var canvasOn = false;

var Home = {

  roomId:	null,

  init() {
    var Home = this;

    Home.getRoomId();
    Home.konami();
    Home.isSafariMobile();
    Home.consoleText();

    window.sr = new ScrollReveal({
      mobile: true
    });

    if (_canvasContent) {
      Home.canvasMobile();
    }
  },
  consoleText() {
    var _console = document.getElementsByClassName('console')[0];
    console.log(_console.innerText);
    _content.removeChild(_console);
  },
  isSafariMobile() {
    var userAgent = window.navigator.userAgent;
    // Uniquement Safari
    if (!userAgent.match('CriOS') && userAgent.match(/Safari/i)) {
      // Uniquement Iphone et Ipad
      if (userAgent.match(/iPhone/i) || userAgent.match(/iPad/i)) {
        _content.style.height = winInH + 'px';
      }
    }
  },
  canvasMobile() {
    var stats;
    var container = _canvasContent;
    var camera; var scene; var light; var renderer;
    var cube;
    document.ontouchstart = function(e) {
      e.preventDefault();
    };

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    init();
    //
    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, winInW / winInH, 0.1, 1000);
      camera.position.set(0, 0, 1000);

      light = new THREE.AmbientLight(0x404040); // soft white light

      scene.add(light);

      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xf9f9f9);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      camera.position.z = 5;

      buildCube();
    }

    function buildCube() {

      var geometry = new THREE.BoxGeometry(2, 2, 2);
      var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      cube = new THREE.Mesh(geometry, material);

      scene.add(cube);

      var render = function(value) {

        if (value) {
          cube.rotation.y = value / 30;
        }else {
          cube.rotation.y = 0;
        }

        renderer.render(scene, camera);
      };

      var lastGamma = 0;
      window.addEventListener('deviceorientation', function(event) {
        var gamma = Math.round(event.gamma);
        if (gamma < lastGamma || gamma > lastGamma) {
          render(gamma);
        }
        lastGamma = gamma;
      });

      render();
    }
  },

  getRoomId() {
    var	roomId = 0;
    socket.emit('getRoomId');

    socket.on('roomIdGenerated', function(data) {

      Home.roomId = data;

    });

  },
  /**
   * Konami code
   */
  konami() {
    var keysList	= [38,38,40,40,37,39,37,39,66,65];
    var key	= 0;
    var started	= false;
    var count	= 0;
    var found	=	false;

    document.addEventListener('keydown', function(e) {
      var reset = function() {
        started = false;
        count = 0;
        return;
      };

      key = e.keyCode;

      //Begin watching if first key in sequence was pressed.
      if (!started) {
        if (key === 38)	{
          started = true;
        }
      }

      // If we've started, pay attention to key presses, looking for right sequence.
      if (started) {

        if (keysList[count] == key) {
          count++;
        } else {
          // Incorrect key, restart.
          console.log('fail');
        }

        if (count == 10) {
          //Success!
          console.log('Konami code entered! Do something cool here.');

          Home.setCookie('konami', true, 0.09);

          if (String(Home.roomId).length === 4) {
            var location = document.location.origin + '/game/' + Home.roomId;
            window.location.replace(location);
          }

          reset();
        }
      } else {
        console.log('fail');
        reset();
      }
    });
  },

  setCookie(cname, cvalue, exdays) {
    var d = new Date();

    d.setTime(d.getTime() + (30 * 1000));

    var expires = 'expires=' + d.toGMTString();

    document.cookie = cname + '=' + cvalue + '; ' + expires;
  }
};

module.exports = Home;
