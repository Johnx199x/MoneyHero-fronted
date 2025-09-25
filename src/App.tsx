import './App.css';
import './Styles/global.css';
import './Styles/variables.css';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import { HomePage } from './features/landing/HomePage';

function App() {
	return (
		<>
			<NavBar />
			<HomePage />
			<Footer />
		</>
	);
}

export default App;
