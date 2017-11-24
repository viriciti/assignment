import 'react-hot-loader/patch'

import React    from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './less/app.less'

import socket from "./lib/socket"

import App from './components/App'

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<App socket={socket} />
		</AppContainer>,
		document.getElementById('root')
	)
}

socket.once('ready', () => {
	console.log('Socket ready')
	render(App)
})

if (module.hot) {
	module.hot.accept('./components/App', () => { render(App) })
}
