// src/store/playerStore.ts - Versión SUPER SIMPLE
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
	// Datos básicos
	playerName: string;
	money: number;
	debt: number;
	level: number;
	percentLevel: number;
	exp: number;
	expToNextLevel: number;

	// Acciones básicas
	setPlayerName: (name: string) => void;
	addMoney: (amount: number) => void;
	spendMoney: (amount: number) => void;
	addExp: (amount: number) => void;
	loseExp: (amount: number) => void;
}
const config = {
	expGainRate: 0.1, // 10% del dinero ganado = exp
	expLossRate: 0.07, // 7% del dinero en deudads -= exp
	levelGrowthRate: 1.1, // cada nivel requiere +10% exp que el anterior
	baseExp: 100, // exp base
};
function getExpForLevel(level: number): number {
	return Math.floor(config.baseExp * config.levelGrowthRate ** (level - 1));
}

export const usePlayerStore = create<PlayerState>()(
	persist(
		(set, get) => ({
			// Estado inicial
			playerName: 'Hero',
			money: 1000,
			debt: 0,
			level: 1,
			exp: 0,
			percentLevel: 0,
			expToNextLevel: config.baseExp,

			// Acciones
			setPlayerName: name => set({ playerName: name }),

			addMoney: amount => {
				const state = get();
				let debt = state.debt;
				let newMoney = state.money;

				if (debt !== 0) {
					if (debt - amount < 0) {
						newMoney = amount - debt;
						state.addExp(amount - debt);
						debt = 0;
					} else debt -= amount;
				} else {
					newMoney = state.money + amount;
					state.addExp(amount);
				}

				set({
					money: newMoney,
					debt,
				});
			},

			spendMoney: amount => {
				const state = get();
				const newMoney = Math.max(0, state.money - amount);
				let newDebt = state.debt;

				if (state.money - amount < 0) {
					newDebt += amount - state.money;
					state.loseExp(amount - state.money);
				}

				set({ money: newMoney, debt: newDebt });
			},

			addExp: amount => {
				const expGained = amount * config.expGainRate;

				const state = get();

				let newExp = state.exp + expGained;
				let newLevel = state.level;
				let newExpToNextLevel = state.expToNextLevel;

				// Level up
				while (newExp >= newExpToNextLevel) {
					newExp -= newExpToNextLevel;
					newLevel += 1;
					newExpToNextLevel = getExpForLevel(newLevel);
				}
				set({
					exp: Math.floor(newExp),
					percentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
					level: newLevel,
					expToNextLevel: Math.floor(newExpToNextLevel),
				});
			},
			loseExp: amount => {
				let expLoosed = amount * config.expLossRate;

				const state = get();

				let newExp = state.exp;
				let newLevel = state.level;
				let newExpToNextLevel = state.expToNextLevel;

				while (expLoosed > 0) {
					if (newExp > expLoosed) {
						newExp -= expLoosed;
						expLoosed = 0;
					} else {
						if (newLevel === 1 && expLoosed > newExp) {
							newExp = 0;
							expLoosed = 0;
							break;
						}
						newLevel--;
						expLoosed -= newExp;
						newExpToNextLevel = getExpForLevel(newLevel);
						newExp = newExpToNextLevel;
					}
				}

				set({
					exp: Math.floor(newExp),
					level: newLevel,
					percentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
					expToNextLevel: newExpToNextLevel,
				});
			},
		}),
		{
			name: 'moneyhero-simple-storage',
		},
	),
);
