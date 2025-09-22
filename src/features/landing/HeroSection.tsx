import './HeroSection.css'

export default function HeroSection(){
    // todo: change button with component button
    return(
        <section className="hero-section">
           
            <h1 className="hero-section-h1">Transform Your Finances Into An Epic RPG Adventure</h1>
            <h2 className='hero-section-h2'>Where saving money makes you stronger and spending is strategic combat</h2>
            <button type="button" className="button"> Start quest</button>
            <img src="https://placehold.co/1200x675/1F2937/F59E0B?text=Dashboard+Mockup" alt="dashboard mockup" className="img-mockup"/>

        </section>
    )
}