"use strict";
var socket = io();

var Remote = {
	init(){
		var app = this;

	},
	remoteConnect(){
		var roomId = document.getElementById('roomId').innerHTML;

		socket.on('connect', function(){
		  socket.emit('roomConnect', roomId);

		  socket.on('roomConnected', function(data){
		    if(data.boolean && data.roomId == roomId) {
		      console.log(data);
		      console.log('roomConnected');
		    }
		  });
		});
	}

}

module.exports = Remote;
