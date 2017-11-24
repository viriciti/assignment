import io from "socket.io-client"

var socket = null

var getSocket = function() {
	if(socket)
		return socket

	socket = io.connect('http://localhost:8888', {reconnect: true});

	return socket

}

export default getSocket
