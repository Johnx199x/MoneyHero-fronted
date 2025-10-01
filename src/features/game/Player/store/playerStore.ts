// src/store/playerStore.ts - Versión SUPER SIMPLE
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction } from '../../../../shared/types/index.type';

interface PlayerState {
	// Datos básicos
	playerName: string;
	money: number;
	debt: number;
	level: number;
	percentLevel: number;
	exp: number;
	expToNextLevel: number;
	transactionHistory: Transaction[];

	// Acciones básicas
	setPlayerName: (name: string) => void;
	addMoney: (amount: number) => { gainedExp: number };
	spendMoney: (amount: number) => { losedExp: number; isDebt: boolean };
	addTransaction: (transaction: Transaction) => void;
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
			money: 0,
			debt: 0,
			level: 1,
			exp: 0,
			percentLevel: 0,
			expToNextLevel: config.baseExp,
			transactionHistory: [],

			// Acciones

			addTransaction: transaction => {
				const state = get();
				const transactionHistory = state.transactionHistory;
				const newTransactionHistory = [...transactionHistory, transaction];

				if (transaction.type === 'income') {
					const result = state.addMoney(transaction.amount);

					transaction.expGained = result.gainedExp;
					transaction.battleResult = 'victory';
				} else {
					const result = state.spendMoney(transaction.amount);
					transaction.expLoosed = result.losedExp;
					transaction.battleResult = result.isDebt ? 'critical' : 'defeat';
				}

				transaction.id = crypto.randomUUID();

				set({
					transactionHistory: newTransactionHistory,
				});
			},

			setPlayerName: name => set({ playerName: name }),

			addMoney: amount => {
				const state = get();
				let debt = state.debt;
				let newMoney = state.money;
				let gainedExp = (amount - debt) * config.expGainRate;

				if (debt !== 0) {
					if (debt - amount < 0) {
						newMoney = amount - debt;
						state.addExp(gainedExp);
						debt = 0;
					} else debt -= amount;
				} else {
					newMoney = state.money + amount;
					gainedExp = amount * config.expGainRate;
					state.addExp(gainedExp);
				}

				set({
					money: newMoney,
					debt,
				});
				return { gainedExp };
			},

			spendMoney: amount => {
				const state = get();
				const newMoney = Math.max(0, state.money - amount);
				let isDebt = false;
				let newDebt = state.debt;
				const expLoosed = (amount - state.money) * config.expLossRate;

				if (state.money - amount < 0) {
					newDebt += amount - state.money;
					isDebt = true;

					state.loseExp(expLoosed);
				}

				set({ money: newMoney, debt: newDebt });
				return { losedExp: expLoosed, isDebt };
			},

			addExp: amount => {
				const state = get();

				let newExp = state.exp + amount;
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
				const state = get();

				let newExp = state.exp;
				let newLevel = state.level;
				let newExpToNextLevel = state.expToNextLevel;

				while (amount > 0) {
					if (newExp > amount) {
						newExp -= amount;
						amount = 0;
					} else {
						if (newLevel === 1 && amount > newExp) {
							newExp = 0;
							amount = 0;
							break;
						}
						newLevel--;
						amount -= newExp;
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
