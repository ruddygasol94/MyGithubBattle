import React from 'react'
import PropTypes from 'prop-types'

//forma por clase
class Hello extends React.Component {
	
	render() {
		return (
			/*<h2>
				{this.props.names}

				{this.props.authed === true
					? <button onClick={this.props.logout}>Logout</button>
					: null}
			</h2>*/
			<ul id="names">
				{this.props.names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>
		)
	}
}



export default Hello

//forma por funcion

/*export default function Hello({ name }) {
	return <h1>Hello, {name}</h1>
}*/

Hello.propTypes = {
	names: PropTypes.arrayOf(PropTypes.string)
}