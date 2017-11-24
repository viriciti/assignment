import React, { Component } from 'react'

class LiveDataLogComponent extends Component {
	render() {
		return (
			<div>
				{
					// Show data with newest object on top
					this.props.logs.reverse().map((log) =>
						<p key={log.time}>{ JSON.stringify(log) }</p>
					)
				}
			</div>
		)
	}
}

export default LiveDataLogComponent
