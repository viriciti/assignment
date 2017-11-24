import 'react-hot-loader/patch'

import React    from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './less/app.less'

import getSocket from "./singletons/getSocket"

import App from './components/App'

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.getElementById('root')
	)
}

// Get new socket
const socket = getSocket()
socket.once('ready', () => {
	console.log('Socket ready')
	render(App)
})

if (module.hot) {
	module.hot.accept('./components/App', () => { render(App) })
}
