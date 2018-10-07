var express = require('express'),
	app = express(),
	ExpressPeerServer = require('peer').ExpressPeerServer;

var options = {
	debug: true,
	allow_discovery: true
};

app.use(express.static("public"));

var webserver = app.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:' + (process.env.PORT || 3000));
});

var peerserver = ExpressPeerServer(webserver, options);
app.use('/peerjs', peerserver);

var peers = [];

peerserver.on('connection', function(id) {
	console.log('connected by id: ' + id);
	peers.push(id);
});

peerserver.on('disconnect', function(id) {
	console.log('disconnected by id: ' + id);
	var idx = peers.indexOf(id);
	if(idx > -1) { peers.splice(idx, 1); }
});