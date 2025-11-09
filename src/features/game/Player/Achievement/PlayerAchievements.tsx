/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { useTransactionContext } from '../../../../context/transationContext';
import './PlayerAchievements.css';

export default function PlayerAchievements() {
  const { achievements } = useTransactionContext();
  
  const achievementsArray = Array.isArray(achievements) ? achievements : [];
  
  
  const unlockedAchievements = achievementsArray.filter(a => a.unlocked === true);

  // Categorizar logros
  const categorizedAchievements = achievementsArray.reduce((acc, achievement) => {
    const category = achievement.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievementsArray>);

  if (achievementsArray.length === 0) {
    return (
      <section className="achievements-section" id="achievements">
        <h2 className="section-title-2">🏆 Achievements</h2>
        <p>Loading Achievements...</p>
      </section>
    );
  }

  return (
    <section className="achievements-section" id="achievements">
      <h2 className="section-title-2">🏆 Achievements</h2>
      
      <div className="achievement-stats">
        <span>{unlockedAchievements.length} / {achievementsArray.length} Desbloqueados</span>
      </div>

      {Object.entries(categorizedAchievements).map(([category, categoryAchievements]) => (
        <div key={category} className="achievement-category">
          <h3>{category}</h3>
          <div className="achievements-grid">
            {categoryAchievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`achievement-card ${achievement.rarity} ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <span className="achievement-icon">{achievement.icon}</span>
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
                {!achievement.unlocked && <div className="locked-overlay">🔒</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}