import type { PlayerState } from '../../features/game/Player/store/playerStore';

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
