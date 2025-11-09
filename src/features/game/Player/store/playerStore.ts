import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACHIEVEMENTS } from '../../../../shared/constants/achievement';
import type { Transaction } from '../../../../shared/types/index.type';

export interface PlayerState {
	playerName: string;
	money: number;
	debt: number;
	level: number;
	percentLevel: number;
	exp: number;
	expToNextLevel: number;
	transactionHistory: Transaction[];
	unlockedAchievements: string[];

	checkAchievements: () => string[];
	setPlayerName: (name: string) => void;
	addMoney: (amount: number) => { gainedExp: number };
	spendMoney: (amount: number) => { losedExp: number; isDebt: boolean };
	addTransaction: (transaction: Transaction) => void;
	deleteTransaction: (id: string) => void;
	addExp: (amount: number) => {
		newExp: number;
		newLevel: number;
		newExpToNextLevel: number;
	};
	loseExp: (amount: number) => {
		newExp: number;
		newLevel: number;
		newpercentLevel: number;
		newExpToNextLevel: number;
	};
}

const config = {
	expGainRate: 0.1,
	expLossRate: 0.07,
	levelGrowthRate: 1.1,
	baseExp: 100,
};

function getExpForLevel(level: number): number {
	return Math.floor(config.baseExp * config.levelGrowthRate ** (level - 1));
}

function generateId(): string {
	if (crypto?.randomUUID) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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
			unlockedAchievements: [],

			checkAchievements: () => {
				try {
					const state = get();
					const newUnlocked: string[] = [];
					let totalExpReward = 0; // ✅ Acumular todos los EXP de logros

					ACHIEVEMENTS.forEach(achievement => {
						try {
							const isUnlocked = state.unlockedAchievements.includes(
								achievement.id,
							);
							const meetsCondition = achievement.condition(state);

							if (!isUnlocked && meetsCondition) {
								newUnlocked.push(achievement.id);

								if (achievement.reward?.exp) {
									totalExpReward += achievement.reward.exp;
								}
							}
						} catch (error) {
							console.error(
								`Error checking achievement ${achievement.id}:`,
								error,
							);
						}
					});

					if (newUnlocked.length > 0) {
						const expResult = state.addExp(totalExpReward);

						set({
							unlockedAchievements: [
								...state.unlockedAchievements,
								...newUnlocked,
							],
							exp: expResult.newExp,
							level: expResult.newLevel,
							expToNextLevel: expResult.newExpToNextLevel,
							percentLevel: Math.floor(
								(expResult.newExp / expResult.newExpToNextLevel) * 100,
							),
						});
					}

					return newUnlocked;
				} catch (error) {
					console.error('Error in checkAchievements:', error);
					return [];
				}
			},
			// Función para agregar una transacción
			addTransaction: transaction => {
				try {
					const state = get();
					const transactionHistory = state.transactionHistory;
					const newTransaction = { ...transaction };

					newTransaction.id = generateId();

					if (newTransaction.type === 'income') {
						const result = state.addMoney(newTransaction.amount);
						newTransaction.exp_gained = result.gainedExp;
						newTransaction.battle_result = 'victory';
					} else {
						const result = state.spendMoney(newTransaction.amount);
						newTransaction.exp_lost = result.losedExp;
						newTransaction.battle_result = result.isDebt
							? 'critical'
							: 'defeat';
					}

					const newTransactionHistory = [...transactionHistory, newTransaction];

					set({
						transactionHistory: newTransactionHistory,
					});

					setTimeout(() => {
						try {
							get().checkAchievements();
						} catch (error) {
							console.error(
								'Error checking achievements after transaction:',
								error,
							);
						}
					}, 0);
				} catch (error) {
					console.error('Error adding transaction:', error);
					throw new Error('Failed to add transaction');
				}
			},

			deleteTransaction: (id: string) => {
				try {
					const state = get();
					const transaction = state.transactionHistory.find(t => t.id === id);

					if (!transaction) return;

					const newHistory = state.transactionHistory.filter(t => t.id !== id);

					let money = 0;
					let debt = 0;
					let exp = 0;
					let level = 1;
					let expToNextLevel = config.baseExp;

					const sortedHistory = [...newHistory].sort(
						(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
					);

					for (const t of sortedHistory) {
						if (t.type === 'income') {
							if (debt > 0) {
								if (debt >= t.amount) {
									debt -= t.amount;
								} else {
									const remaining = t.amount - debt;
									debt = 0;
									money += remaining;
									exp += remaining * config.expGainRate;
								}
							} else {
								money += t.amount;
								exp += t.amount * config.expGainRate;
							}
						} else {
							if (money >= t.amount) {
								money -= t.amount;
							} else {
								const shortage = t.amount - money;
								money = 0;
								debt += shortage;
								exp -= shortage * config.expLossRate;
								exp = Math.max(0, exp);
							}
						}

						while (exp >= expToNextLevel) {
							exp -= expToNextLevel;
							level++;
							expToNextLevel = getExpForLevel(level);
						}

						while (exp < 0 && level > 1) {
							level--;
							expToNextLevel = getExpForLevel(level);
							exp += expToNextLevel;
						}
					}

					set({
						transactionHistory: newHistory,
						money: Math.floor(money),
						debt: Math.floor(debt),
						exp: Math.floor(exp),
						level,
						expToNextLevel: Math.floor(expToNextLevel),
						percentLevel: Math.floor((exp / expToNextLevel) * 100),
					});
				} catch (error) {
					console.error('Error deleting transaction:', error);
					throw new Error('Failed to delete transaction');
				}
			},

			setPlayerName: name => {
				try {
					set({ playerName: name });
				} catch (error) {
					console.error('Error setting player name:', error);
				}
			},

			addMoney: amount => {
				try {
					const state = get();
					let debt = state.debt;
					let newMoney = state.money;
					let newExp = state.exp;
					let newLevel = state.level;
					let newExpToNextLevel = state.expToNextLevel;
					let gainedExp = 0;

					if (debt !== 0) {
						if (debt - amount < 0) {
							const remaining = amount - debt;
							newMoney = remaining;
							gainedExp = remaining * config.expGainRate;

							const expResult = state.addExp(gainedExp);

							newExp = expResult.newExp;
							newLevel = expResult.newLevel;
							newExpToNextLevel = expResult.newExpToNextLevel;
							debt = 0;
						} else debt -= amount;
					} else {
						newMoney = state.money + amount;
						gainedExp = amount * config.expGainRate;

						const expResult = state.addExp(gainedExp);
						newExp = expResult.newExp;
						newLevel = expResult.newLevel;
						newExpToNextLevel = expResult.newExpToNextLevel;
					}

					set({
						money: Math.floor(newMoney),
						debt: Math.floor(debt),
						exp: newExp,
						level: newLevel,
						expToNextLevel: newExpToNextLevel,
						percentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
					});
					return { gainedExp };
				} catch (error) {
					console.error('Error adding money:', error);
					return { gainedExp: 0 };
				}
			},

			spendMoney: amount => {
				try {
					const state = get();
					const newMoney = Math.max(0, state.money - amount);
					let isDebt = false;
					let newDebt = state.debt;
					let newExp = state.exp;
					let newLevel = state.level;
					let newExpToNextLevel = state.expToNextLevel;
					let expLoosed = 0;

					if (state.money - amount < 0) {
						newDebt += amount - state.money;
						isDebt = true;
						expLoosed = (amount - state.money) * config.expLossRate;

						const expResult = state.loseExp(expLoosed);
						newExp = expResult.newExp;
						newLevel = expResult.newLevel;
						newExpToNextLevel = expResult.newExpToNextLevel;
					}

					set({
						money: newMoney,
						debt: newDebt,
						exp: newExp,
						level: newLevel,
						expToNextLevel: newExpToNextLevel,
						percentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
					});

					return { losedExp: expLoosed, isDebt };
				} catch (error) {
					console.error('Error spending money:', error);
					return { losedExp: 0, isDebt: false };
				}
			},

			addExp: amount => {
				const state = get();

				try {
					let newExp = state.exp + amount;
					let newLevel = state.level;
					let newExpToNextLevel = state.expToNextLevel;

					while (newExp >= newExpToNextLevel) {
						newExp -= newExpToNextLevel;
						newLevel += 1;
						newExpToNextLevel = getExpForLevel(newLevel);
					}

					return {
						newExp: Math.floor(newExp),
						newLevel,
						newExpToNextLevel: Math.floor(newExpToNextLevel),
					};
				} catch (error) {
					console.error('Error adding exp:', error);
					return {
						newExp: state.exp,
						newLevel: state.level,
						newExpToNextLevel: state.expToNextLevel,
					};
				}
			},

			loseExp: amount => {
				const state = get();

				try {
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
					return {
						newExp: Math.floor(newExp),
						newLevel,
						newpercentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
						newExpToNextLevel: Math.floor(newExpToNextLevel),
					};
				} catch (error) {
					console.error('Error losing exp:', error);
					return {
						newExp: state.exp,
						newLevel: state.level,
						newExpToNextLevel: state.expToNextLevel,
						newpercentLevel: state.percentLevel,
					};
				}
			},
		}),
		{
			name: 'moneyhero-simple-storage',
			onRehydrateStorage: () => (state, error) => {
				if (error) {
					console.error('Error rehydrating storage:', error);
				}
				if (state) {
					console.log('Storage rehydrated successfully');
				}
			},
		},
	),
);
