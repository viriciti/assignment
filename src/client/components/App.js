import React, { Component } from 'react'

import Header from './lib/Header.js'
import LogoComponent from './lib/LogoComponent.js'
import LiveDataLogComponent from './lib/LiveDataLogComponent.js'

class App extends Component {
	state = {
		logs: []
	}

	componentDidMount() {
		// Save data in state on data event
		this.props.socket.on('state', (state) => {
			this.setState({ logs: this.state.logs.concat([state]) })
		})
	}

	render() {
		return (
			<section>
				<article id='app-container'>
					<Header />
					<LogoComponent />
				</article>
				<article id='log-container'>
					<LiveDataLogComponent logs={ this.state.logs } />
				</article>
			</section>
		)
	}
}

export default App
