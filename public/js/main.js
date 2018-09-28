const ws = new WebSocket("ws://192.168.43.1:1337");
document.getElementById("hi").innerHTML = "Something";

function onClick() {
	ws.send(document.getElementById("msg"));
	console.log("Message is sent...");
}

ws.onmessage = function(data) {
	document.getElementById("hi").innerHTML = data.toString();
}
