import type { PlayerState } from '../../features/game/Player/store/playerStore';

//used un store
export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: 'savings' | 'level' | 'transactions' | 'special';
	rarity: 'common' | 'rare' | 'epic' | 'legendary';
	condition: (state: PlayerState) => boolean;
	reward?: {
		exp?: number;
		title?: string;
	};
}
export interface AchievementReward {
	exp?: number;
	title?: string;
}
//using in Backend
export interface IAchievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: 'savings' | 'level' | 'transactions' | 'special';
	rarity: 'common' | 'rare' | 'epic' | 'legendary';
	conditionType: string;
	conditionParams: object;
	reward?: AchievementReward;
	unlocked: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
