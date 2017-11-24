import io from "socket.io-client"

console.log('Connecting to', window.location.href)

export default io.connect(window.location.href, { reconnect: true })
