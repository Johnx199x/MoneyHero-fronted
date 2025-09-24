import './FeaturePreview.css'
export default function FeaturePreview(){
    return (
        // biome-ignore lint/correctness/useUniqueElementIds: <explanation>
<section className='featurePreview-section' id='features'>
            <span className="section-title">Feature Preview</span>

           <div className="features-grid">
                {/* Image/Mockup Left */}
                <div className="feature-image">
                    <img 
                        src="https://placehold.co/800x600/1F2937/F59E0B?text=RPG+Dashboard+Stats"
                        alt="Dashboard with RPG stats" 
                        className="img-mockup"
                    />
                </div>
                
                {/* Text Right */}
                <div className="feature-text">
                    <h3 className="feature-title">Dashboard RPG Stats</h3>
                    <p className="feature-description">
                        Monitor your financial hero's stats in real-time. See your gold (cash), EXP (savings progress),
                        and other key metrics on a beautifully designed RPG-style dashboard.
                    </p>
                </div>

                {/* Text Left */}
                <div className="feature-text feature-text-reverse">
                    <h3 className="feature-title">Combat Log & Achievements</h3>
                    <p className="feature-description">
                        Every purchase is logged in a "combat log" for you to review and strategize. Unlock epic
                        achievements like "Debt Slayer" or "Master Saver" and earn unique badges.
                    </p>
                </div>
                
                {/* Image/Mockup Right */}
                <div className="feature-image">
                    <img 
                        src="https://placehold.co/800x600/1F2937/F59E0B?text=Combat+Log+%26+Achievements"
                        alt="Combat log and achievements screen" 
                        className="img-mockup"
                    />
                </div>
            </div>

        </section>
    )
    
}
