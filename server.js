var PORT = 1337;

var express = require('express');
var app = express();
//var server = require('http').Server(app);

var dgram = require('dgram');
var WebSocket= require('ws');
var wss = new WebSocket.Server({port: PORT});

app.use(express.static("public"));
/*app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});*/

wss.on('connection', function(ws) {
	ws.on('message', function (message) {
		var msgBuff = Buffer.from(message);
		console.log(message);
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send("yeet");
			}
		});
	});
});

app.listen(3000, function(){
  console.log('listening on *:' + (3000));
});
