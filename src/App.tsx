import './App.css';
import './Styles/global.css'
import './Styles/variables.css'
import NavBar from './components/layout/navBar';
import { HomePage } from './features/landing/HomePage';

function App() {
	return (
		<> 
			<NavBar />
			<HomePage />
		</>

	);
}

export default App;
