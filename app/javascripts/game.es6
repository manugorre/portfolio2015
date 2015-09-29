"use strict";
var socket = io();

var _canvasContent = document.getElementsByClassName('canvasContent')[0];
//var _canvas = document.createElement('canvas');

var three = {};
var renderer, scene, camera, cube, light;

var Game = {
	init(){
		var app = this;
		//this.createCanvas();

		var cookie = app.checkCookie('konami');
				cookie = Boolean(cookie);

		// if(!cookie){
		// 	window.location.replace(document.location.origin);
		// }else{
		// 	/**
		// 	* @todo
		// 	*   - lancer le jeu
		// 	*/
		// }

		//this.socket();
	},
	checkCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }

    return "";
	},
	createCanvas(){
		var app = this;

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		camera.position.set( 0, 0, 1000);

		light = new THREE.AmbientLight( 0x404040 ); // soft white light

		scene.add( light );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );

		_canvasContent.appendChild( renderer.domElement );

		camera.position.z = 5;
	}
}

module.exports = Game;
