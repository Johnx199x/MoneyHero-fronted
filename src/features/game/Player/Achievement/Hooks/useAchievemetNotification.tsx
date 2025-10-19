import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../../store/playerStore';

export function useAchievementNotifications() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const previousAchievementsRef = useRef<string[]>([]);
  const isInitializedRef = useRef(false);
  const unlockedAchievements = usePlayerStore(state => state.unlockedAchievements);

  useEffect(() => {
    if (!isInitializedRef.current) {
      previousAchievementsRef.current = [...unlockedAchievements];
      isInitializedRef.current = true;
      console.log('🎮 Logros iniciales cargados:', unlockedAchievements.length);
      return;
    }

    const newAchievements = unlockedAchievements.filter(
      id => !previousAchievementsRef.current.includes(id)
    );

    if (newAchievements.length > 0) {
      console.log('✨ Nuevos logros desbloqueados:', newAchievements);
      setNotifications(prev => [...prev, ...newAchievements]);
      previousAchievementsRef.current = [...unlockedAchievements];
    }
  }, [unlockedAchievements]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n !== id));
  };

  return { notifications, removeNotification };
}