import { useEffect, useState } from 'react';
import { usePlayerStore } from '../../store/playerStore';

export function useAchievementNotifications() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const unlockedAchievements = usePlayerStore(state => state.unlockedAchievements);

  useEffect(() => {
    const prevCount = parseInt(localStorage.getItem('achievementCount') || '0');
    const currentCount = unlockedAchievements.length;

    if (currentCount > prevCount) {
      const newAchievements = unlockedAchievements.slice(prevCount);
      setNotifications(prev => [...prev, ...newAchievements]);
      localStorage.setItem('achievementCount', currentCount.toString());
    }
  }, [unlockedAchievements]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n !== id));
  };

  return { notifications, removeNotification };
}