const express  = require('express')
const debug    = require('debug')('server')
const config   = require('config')
const path     = require('path')
const http     = require('http')
const socketio = require('socket.io')

const creatVehicle = require('./lib/vehicle')

const app = express()
const server = http.Server(app)
const io  = socketio.listen(server)

// Start vehicle data
const startVehicle = () => {
	return creatVehicle({file: path.resolve(__dirname, '../../meta/route.csv')})
}

// Init vehicle
let vehicle = startVehicle()
const sockets = []

// If new datapoint, emit it to the socket
vehicle.on('state', (state) => {
	// sockets.forEach((socket) => {
	// 	socket.emit('state', state)
	// })
	io.sockets.emit('state', state)
})

// Once the vehicle went through all the data, start the data again from the start
vehicle.on('end', () => vehicle = startVehicle())

// On client connection

io.on('connection', function(socket){
	sockets.push(socket)
	console.log('Client connected. Connected:', sockets.length)

	socket.once('disconnect', () => {
		sockets.splice(sockets.findIndex((sckt) => sckt.id === socket.id), 1)
		console.log('Client disconnected. Connected:', sockets.length)
	})

	// Let the client socket now that we're ready
	socket.emit('ready')
});


if (process.env.NODE_ENV !== 'production') {
	const webpackHotMiddleware = require('webpack-hot-middleware')
	const webpackMiddleware    = require('webpack-dev-middleware')
	const webpackConfig        = require('../../webpack.config.js')
	const webpack              = require('webpack')

	const compiler = webpack(webpackConfig)

	// Middlewares for webpack
	debug('Enabling webpack dev and HMR middlewares...')
	app.use(webpackMiddleware(compiler, {
		hot: true,
		stats: {
			colors: true,
			chunks: false,
			chunksModules: false
		},
		historyApiFallback: true
	}))

	app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr' }))

	app.use('*', (req, res, next) => {
		const filename = path.join(compiler.outputPath, 'index.html')
		compiler.outputFileSystem.readFile(filename, (err, result) => {
			if (err)
				return next(err)
			res.set('content-type', 'text/html')
			res.send(result)
			res.end()
		})
	})
}

else {
	app.use(express.static('dist'))
	app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))
}

const port = config.server.port
server.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}`))
