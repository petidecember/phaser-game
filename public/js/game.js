class Player extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, master) {
		super(scene, x, y, 'doomguy');
		this.master = master;
		scene.physics.world.enableBody(this); // Generate Physics Body for the Sprite (same as physics.add.<xyz>())
		this.setScale(95/800);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if(this.master) // if the player is local
		{
			if (cursors.left.isDown)
			{
				this.setVelocityX(-260);
			}
			else if (cursors.right.isDown)
			{
				this.setVelocityX(260);
			}
			else
			{
				this.setVelocityX(0);
			}

			if (cursors.up.isDown && this.body.touching.down)
			{
				this.setVelocityY(-530);
			}
		}
		this.setCollideWorldBounds(true);
	}
}

var config = { 
	type: Phaser.AUTO, 
	width: window.innerWidth * window.devicePixelRatio, 
	height: window.innerHeight * window.devicePixelRatio, 
	scene: { 
		preload: preload, 
		create: create, 
		update: update
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 600 },
			debug: true 
		},
	},
	fps: {
		target: 60
	}
}; 
// I am having concerns about the declaration for "connect" being in the html file but i define it here
function connect()
{
	connect_modal.style.display = 'none';
	console.log('connect');
}

var game = new Phaser.Game(config);
var peer = new Peer({host: 'localhost', port: 3000, path:'/peerjs'});
var graphics;
var players;
var cursors;

peer.on('open', function(id) {
	console.log('Peer: ' + id);
});

function preload () {
	this.load.image('block', 'img/block.png');
	this.load.image('doomguy', 'img/doomguy.jpg');
}

function create () {
	cursors = this.input.keyboard.createCursorKeys();
	
	resize();
	window.addEventListener('resize', resize);
	game.canvas.addEventListener('click', gofull);
	
	graphics = this.add.graphics({ fillStyle: { color: 0x00f0ff } });

	players = this.physics.add.group({ allowGravity: true });
	players.add(new Player(this, 512, 256, true), true);

	var block = this.physics.add.staticImage(512, 768, 'block');
	this.physics.add.collider(players, block);
} 

function update () {
	graphics.clear();
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
}
