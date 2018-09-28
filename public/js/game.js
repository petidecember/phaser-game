var config = { 
    type: Phaser.AUTO, 
    width: 344, 
    height: 500, 
    scene: { 
        preload: preload, 
        create: create, 
        update: update
    } 
}; 
var game = new Phaser.Game(config); 
function preload () { } 
function create () {
this.add.rectangle(400, 300, 500, 120, 0x00ff00);
} 
function update () { }