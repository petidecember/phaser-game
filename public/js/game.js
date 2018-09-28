var config = { 
    type: Phaser.AUTO, 
    width: window.innerWidth * window.devicePixelRatio, 
    height: window.innerHeight * window.devicePixelRatio, 
    scene: { 
        preload: preload, 
        create: create, 
        update: update
    } 
}; 

var game = new Phaser.Game(config); 
var req;

function preload () { } 
function create () {
	resize();
	window.addEventListener('resize', resize, false);
	window.addEventListener('click', gofull);
	window.addEventListener('touchstart', gofull);
	this.add.rectangle(400, 300, 500, 120, 0x00ff00);
	text = this.add.text(16, 16, 'request: ', {fontSize: '32px', fill: '#fff'});
} 

function update () { }

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

function gofull() {
	var el = document.getElementsByTagName('canvas')[0];
	var requestFullscreen = el.requestFullScreen || el.msRequestFullScreen || el.mozRequestFullScreen || el.webkitRequestFullScreen;
	//this.canvas[this.device.fullscreen.request]();
	if(requestFullscreen)
		requestFullscreen.call(el);
	text.setText('request: ' + requestFullscreen);
}

