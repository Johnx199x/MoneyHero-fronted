import Card from '../../components/ui/Card'

export default function FeaturePreview(){
    return (
        <section className='featurePreview-section'>
            <span className="section-title">Feature Preview</span>

            <img className='img-mockup' src="https://placehold.co/1200x675/1F2937/F59E0B?text=RPG+Dashboard+Stats" alt="Dashboard with RPG stats" />

            <Card title='Dashboard RPG Stats' description= "Monitor your financial hero's stats in real-time. See your gold (cash), EXP (savings progress), and other key metrics on a beautifully designed RPG-style dashboard." />

            <img className='img-mockup' src="https://placehold.co/1200x675/1F2937/F59E0B?text=Combat+Log+&+Achievements" alt="Combat log and achievements screen" />

            <Card title='Combat Log & Achievements' description='Every purchase is logged in a "combat log" for you to review and strategize. Unlock epic achievements like "Debt Slayer" or "Master Saver" and earn unique badges.' />
        </section>
    )
    
}
