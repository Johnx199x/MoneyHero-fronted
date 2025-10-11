import { AchievementToast } from './Achievement/Components/AchievementToast';
import { useAchievementNotifications } from './Achievement/Hooks/useAchievemetNotification';
import PlayerAchievements from './Achievement/PlayerAchievements';
import PlayerAnalytics from './Charts/PlayerAnalytics';
import PlayerDashboard from './Dashboard/PlayerDashBoard';
import PlayerHistory from './TransactionHistory/PlayerHistory';
export default function GamePage() {
	const { notifications, removeNotification } = useAchievementNotifications();

	return (
		<>
			<div className='achievement-notifications'>
				{notifications.map(achievementId => (
					<AchievementToast
						key={achievementId}
						achievementId={achievementId}
						onClose={() => removeNotification(achievementId)}
					/>
				))}
			</div>
			<PlayerDashboard />
			<PlayerAnalytics />
			<PlayerHistory />
			<PlayerAchievements />
		</>
	);
}
