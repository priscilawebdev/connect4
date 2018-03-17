import { h, render } from 'preact'
import Router from 'preact-router'
import 'utils/styles/index.sass'
import Home from './pages/Home'

const Main = () => (
	<Router>
		<Home path='/' />
	</Router>
)

render(<Main />, document.getElementById('root'))
