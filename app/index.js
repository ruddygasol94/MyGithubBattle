import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//import Hello from './Hello'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))
import Loading from './components/loading'

function isAuthed () {
	return false
}

function isNew () {
	return false
}

export class App extends React.Component {
	state = {
		'theme': 'light',
		toggleTheme: () => {
			this.setState(({ theme }) => ({
				theme: theme === 'light' ? 'dark' : 'light'
			}))
		}
	}
	render() {
		const authed = isAuthed()
		const firstLogin = isNew()

		/*
		//validaciones con variables
		if (firstLogin === true) {
			return <h1>Welcome!</h1>
		} else if (authed === true) {
			return <h1>Welcome back!</h1>
		} else {
			return <h1>Login to see your dashboard</h1>
		}

		const name = 'Ruddy'

		return (
			<div>
				<h1>Hello, {name}</h1>
				<p>Today is {new Date().toLocaleString()}</p>

			</div>
		)

		return <Hello 
					username='ruddy'
					authed={true}
					logout={() => alert('Logged out!')}
					header={<h1>Hi!</h1>}
				/>*/

		return (
			<Router>
				<ThemeProvider value={this.state} >
				  <div className={this.state.theme}>
					<div className='container'>
						<Nav />

						<React.Suspense fallback={<Loading />}>
						<Switch>
							<Route exact path='/' component={Popular} />
							<Route exact path='/battle' component={Battle} />
							<Route path='/battle/results' component={Results} />
							<Route render={() => <h1>404</h1>} />
						</Switch>
						</React.Suspense>
					</div>
				  </div>
				</ThemeProvider>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)