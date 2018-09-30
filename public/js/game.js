var config = { 
	type: Phaser.AUTO, 
	width: window.innerWidth * window.devicePixelRatio, 
	height: window.innerHeight * window.devicePixelRatio, 
	scene: { 
		preload: preload, 
		create: create, 
		update: update
	},
	fps: {
		target: 30
	}
}; 

const FFT_LENGTH = 256;
const PI2 = Math.PI * 2.0;

var volume = new Tone.Volume(-12);
var game = new Phaser.Game(config); 
var fft = new Tone.FFT(FFT_LENGTH);
var player = new Tone.Player("../audio/Flags on the Moon.mp3", function() { player.start(); }).chain(fft, volume, Tone.Master);
var req;

var lines = [];
var graphics;

function preload () { } 
function create () {
	resize();
	window.addEventListener('resize', resize);
	game.canvas.addEventListener('click', gofull);

	graphics = this.add.graphics({lineStyle: { width: 4, color: 0xaa00aa } });

	for(var i = 0, len = FFT_LENGTH; i < len; i++) {
		var line = new Phaser.Geom.Line(100, 200, 500, 600);
		lines[i] = line;
		graphics.strokeLineShape(line);
	}
	
	req = this.add.text(16, 16, 'request: ', {fontSize: '18px', fill: '#fff'});
} 

function update () {
	graphics.clear();
	var values = fft.getValue();

	for(var i = 0, len = values.length; i < len; i++) {
		var index_percent = i/len;
		var dir_x = Math.cos(PI2 * index_percent);
		var dir_y = Math.sin(PI2 * index_percent);

		var begin_x = game.canvas.style.width*window.devicePixelRatio/2 + 128 * dir_x;
		var begin_y = game.canvas.style.height*window.devicePixelRatio/2 + 128 * dir_y;

		var end_x = -values[i] * dir_x;
		var end_y = -values[i] * dir_y;

		lines[i].setTo(begin_x, begin_y, begin_x + end_x, begin_y + end_y);
		graphics.strokeLineShape(lines[i]);
	}
}

function resize() {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;
 
    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

function gofull() {
	var el = game.canvas;
	var requestFullscreen = el.requestFullScreen || el.msRequestFullScreen || el.mozRequestFullScreen || el.webkitRequestFullScreen;
	
	if(requestFullscreen)
		requestFullscreen.call(el);
	req.setText('request: ' + requestFullscreen);
}

