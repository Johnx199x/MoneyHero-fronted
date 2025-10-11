/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { ACHIEVEMENTS } from '../../../../shared/constants/achievement';

import { usePlayerStore } from '../store/playerStore';
import './PlayerAchievements.css';

export default function PlayerAchievements() {
  const { unlockedAchievements } = usePlayerStore();

  const categorizedAchievements = ACHIEVEMENTS.reduce((acc, achievement) => {
    if (!acc[achievement.category]) acc[achievement.category] = [];
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof ACHIEVEMENTS>);

  return (
    <section className="achievements-section" id="achievements">
      <h2 className="section-title-2">🏆 Achievements</h2>
      
      <div className="achievement-stats">
        <span>{unlockedAchievements.length} / {ACHIEVEMENTS.length} Unlocked</span>
      </div>

      {Object.entries(categorizedAchievements).map(([category, achievements]) => (
        <div key={category} className="achievement-category">
          <h3>{category}</h3>
          <div className="achievements-grid">
            {achievements.map(achievement => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);
              return (
                <div 
                  key={achievement.id}
                  className={`achievement-card ${achievement.rarity} ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <span className="achievement-icon">{achievement.icon}</span>
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                  {!isUnlocked && <div className="locked-overlay">🔒</div>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}