import './Homepage.css';
import CallToAction from './CallToAction';
import FeaturePreview from './FeaturePreview';
import HeroSection from './HeroSection';
import HowItWork from './HowItWork';
export const HomePage = () => {
	return (
		<main className='home-page'>
			<HeroSection />
			<HowItWork />
			<FeaturePreview />
			<CallToAction />
		</main>
	);
};
