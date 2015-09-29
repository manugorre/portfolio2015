"use strict";

var socket = io();
var user = {};
var userAgent = window.navigator.userAgent;

var Analytics = {
	init(){
		//this.getPlatform();
	},
	getPlatform() {
		var reg = /(\((.*?)\))/g;
		var reg2 = /\w*.(?=;)/g
		var device = reg.exec(userAgent);
				device = reg2.exec(device);
		user.device = device[0];
		this.getNavigator();
	},
	getNavigator() {
		var N = navigator.appName, tem;
		var M = userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem = userAgent.match(/version\/([\.\d]+)/i))!= null){
			M[2] = tem[1];
		}

		M = M ? [M[1], M[2]]: [N, navigator.appVersion,'-?'];

		var fullVersion = M[1];

		M[1] = M[1].match(/^(\d+\.)?(\d)/i);

		user.navigator = {
			'name' : M[0],
			'version' : M[1][0],
			'full_version' : fullVersion
		};
		this.getTime();
	},
	getTime() {
		var date = new Date();
		user.date = date;
		this.postInfo();
	},
	getResolution() {
		user.resolution = 'r';
	},
	postInfo() {
		socket.emit('userInfo', user);
	}
}

module.exports = Analytics;
