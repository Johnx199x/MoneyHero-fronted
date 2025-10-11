import type { Achievement } from '../types/index.type';

export const ACHIEVEMENTS: Achievement[] = [
	// ============================================
	// TRANSACTIONS (6 logros)
	// ============================================
	{
		id: 'first-save',
		name: 'First Victory',
		description: 'Complete your first income transaction',
		icon: '🎯',
		category: 'transactions',
		rarity: 'common',
		condition: state =>
			state.transactionHistory.filter(t => t.type === 'income').length >= 1,
	},
	{
		id: 'first-expense',
		name: 'First Battle',
		description: 'Complete your first expense transaction',
		icon: '⚔️',
		category: 'transactions',
		rarity: 'common',
		condition: state =>
			state.transactionHistory.filter(t => t.type === 'expense').length >= 1,
	},
	{
		id: 'transaction-10',
		name: 'Getting Started',
		description: 'Complete 10 transactions',
		icon: '📝',
		category: 'transactions',
		rarity: 'common',
		condition: state => state.transactionHistory.length >= 10,
	},
	{
		id: 'transaction-50',
		name: 'Active Trader',
		description: 'Complete 50 transactions',
		icon: '📊',
		category: 'transactions',
		rarity: 'rare',
		condition: state => state.transactionHistory.length >= 50,
	},
	{
		id: 'transaction-100',
		name: 'Transaction Master',
		description: 'Complete 100 transactions',
		icon: '💼',
		category: 'transactions',
		rarity: 'epic',
		condition: state => state.transactionHistory.length >= 100,
	},
	{
		id: 'transaction-500',
		name: 'Financial Legend',
		description: 'Complete 500 transactions',
		icon: '👑',
		category: 'transactions',
		rarity: 'legendary',
		condition: state => state.transactionHistory.length >= 500,
	},

	// ============================================
	// LEVEL (5 logros)
	// ============================================
	{
		id: 'level-5',
		name: 'Rising Hero',
		description: 'Reach level 5',
		icon: '⭐',
		category: 'level',
		rarity: 'common',
		condition: state => state.level >= 5,
	},
	{
		id: 'level-10',
		name: 'Warrior',
		description: 'Reach level 10',
		icon: '🛡️',
		category: 'level',
		rarity: 'common',
		condition: state => state.level >= 10,
	},
	{
		id: 'level-25',
		name: 'Elite Fighter',
		description: 'Reach level 25',
		icon: '⚡',
		category: 'level',
		rarity: 'rare',
		condition: state => state.level >= 25,
	},
	{
		id: 'level-50',
		name: 'Champion',
		description: 'Reach level 50',
		icon: '🏆',
		category: 'level',
		rarity: 'epic',
		condition: state => state.level >= 50,
	},
	{
		id: 'level-100',
		name: 'Grand Master',
		description: 'Reach level 100',
		icon: '👑',
		category: 'level',
		rarity: 'legendary',
		condition: state => state.level >= 100,
	},

	// ============================================
	// SAVINGS (8 logros)
	// ============================================
	{
		id: 'saver-100',
		name: 'Piggy Bank',
		description: 'Save your first $100',
		icon: '🐷',
		category: 'savings',
		rarity: 'common',
		condition: state => state.money >= 100,
	},
	{
		id: 'saver-500',
		name: 'Emergency Fund',
		description: 'Accumulate $500',
		icon: '💵',
		category: 'savings',
		rarity: 'common',
		condition: state => state.money >= 500,
	},
	{
		id: 'saver-1k',
		name: 'Four Figures',
		description: 'Reach $1,000',
		icon: '💰',
		category: 'savings',
		rarity: 'common',
		condition: state => state.money >= 1000,
	},
	{
		id: 'saver-5k',
		name: 'Solid Foundation',
		description: 'Accumulate $5,000',
		icon: '🏦',
		category: 'savings',
		rarity: 'rare',
		condition: state => state.money >= 5000,
	},
	{
		id: 'master-saver',
		name: 'Five Figures',
		description: 'Accumulate $10,000',
		icon: '💎',
		category: 'savings',
		rarity: 'rare',
		condition: state => state.money >= 10000,
	},
	{
		id: 'saver-25k',
		name: 'Wealth Builder',
		description: 'Accumulate $25,000',
		icon: '🌟',
		category: 'savings',
		rarity: 'epic',
		condition: state => state.money >= 25000,
	},
	{
		id: 'saver-50k',
		name: 'Money Mountain',
		description: 'Reach $50,000',
		icon: '🏔️',
		category: 'savings',
		rarity: 'epic',
		condition: state => state.money >= 50000,
	},
	{
		id: 'saver-100k',
		name: 'Six Figures Hero',
		description: 'Accumulate $100,000',
		icon: '🦸',
		category: 'savings',
		rarity: 'legendary',
		condition: state => state.money >= 100000,
	},

	// ============================================
	// SPECIAL - Debt & Recovery (3 logros)
	// ============================================
	{
		id: 'debt-slayer',
		name: 'Debt Slayer',
		description: 'Pay off all your debts',
		icon: '⚔️',
		category: 'special',
		rarity: 'epic',
		condition: state =>
			state.debt === 0 &&
			state.transactionHistory.some(t => t.battleResult === 'critical'),
	},
	{
		id: 'debt-free-warrior',
		name: 'Debt-Free Warrior',
		description: 'Complete 20 transactions without debt',
		icon: '🛡️',
		category: 'special',
		rarity: 'rare',
		condition: state =>
			state.transactionHistory.length >= 20 &&
			!state.transactionHistory.some(t => t.battleResult === 'critical'),
	},
	{
		id: 'debt-survivor',
		name: 'Comeback King',
		description: 'Recover from debt and reach $1,000+',
		icon: '💪',
		category: 'special',
		rarity: 'rare',
		condition: state => {
			const hadDebt = state.transactionHistory.some(
				t => t.battleResult === 'critical',
			);
			return hadDebt && state.debt === 0 && state.money >= 1000;
		},
	},

	// ============================================
	// SPECIAL - Income (3 logros)
	// ============================================
	{
		id: 'big-income',
		name: 'Jackpot',
		description: 'Receive $5,000+ in one transaction',
		icon: '🎰',
		category: 'special',
		rarity: 'epic',
		condition: state =>
			state.transactionHistory.some(
				t => t.type === 'income' && t.amount >= 5000,
			),
	},
	{
		id: 'income-diversity',
		name: 'Multiple Streams',
		description: 'Have income from 5 different categories',
		icon: '🌊',
		category: 'special',
		rarity: 'rare',
		condition: state => {
			const categories = new Set(
				state.transactionHistory
					.filter(t => t.type === 'income')
					.map(t => t.category),
			);
			return categories.size >= 5;
		},
	},
	{
		id: 'steady-income',
		name: 'Steady Earner',
		description: 'Record 25 income transactions',
		icon: '📈',
		category: 'special',
		rarity: 'rare',
		condition: state =>
			state.transactionHistory.filter(t => t.type === 'income').length >= 25,
	},

	// ============================================
	// SPECIAL - Expense Management (3 logros)
	// ============================================
	{
		id: 'frugal-hero',
		name: 'Frugal Hero',
		description: 'Keep 10 consecutive expenses under $100',
		icon: '🎯',
		category: 'special',
		rarity: 'rare',
		condition: state => {
			const recentExpenses = state.transactionHistory
				.filter(t => t.type === 'expense')
				.slice(-10);
			return (
				recentExpenses.length === 10 &&
				recentExpenses.every(t => t.amount < 100)
			);
		},
	},
	{
		id: 'big-spender',
		name: 'Big Purchase',
		description: 'Spend $1,000+ in one transaction',
		icon: '💸',
		category: 'special',
		rarity: 'rare',
		condition: state =>
			state.transactionHistory.some(
				t => t.type === 'expense' && t.amount >= 1000,
			),
	},
	{
		id: 'balanced-budget',
		name: 'Balanced Budget',
		description: 'Income exceeds expenses over 20 transactions',
		icon: '⚖️',
		category: 'special',
		rarity: 'epic',
		condition: state => {
			if (state.transactionHistory.length < 20) return false;
			const recent = state.transactionHistory.slice(-20);
			const income = recent
				.filter(t => t.type === 'income')
				.reduce((sum, t) => sum + t.amount, 0);
			const expenses = recent
				.filter(t => t.type === 'expense')
				.reduce((sum, t) => sum + t.amount, 0);
			return income > expenses;
		},
	},

	// ============================================
	// SPECIAL - Experience (3 logros)
	// ============================================
	{
		id: 'exp-grinder',
		name: 'EXP Grinder',
		description: 'Gain 1,000 total EXP',
		icon: '🔥',
		category: 'special',
		rarity: 'rare',
		condition: state => {
			const totalExp = state.transactionHistory.reduce(
				(sum, t) => sum + (t.expGained || 0),
				0,
			);
			return totalExp >= 1000;
		},
	},
	{
		id: 'exp-master',
		name: 'EXP Master',
		description: 'Gain 10,000 total EXP',
		icon: '✨',
		category: 'special',
		rarity: 'epic',
		condition: state => {
			const totalExp = state.transactionHistory.reduce(
				(sum, t) => sum + (t.expGained || 0),
				0,
			);
			return totalExp >= 10000;
		},
	},
	{
		id: 'quick-learner',
		name: 'Quick Learner',
		description: 'Gain 500 EXP in one transaction',
		icon: '🚀',
		category: 'special',
		rarity: 'rare',
		condition: state =>
			state.transactionHistory.some(t => (t.expGained || 0) >= 500),
	},

	// ============================================
	// SPECIAL - Time & Consistency (3 logros)
	// ============================================
	{
		id: 'veteran',
		name: 'Veteran Player',
		description: 'Use MoneyHero for 30 days',
		icon: '🗓️',
		category: 'special',
		rarity: 'rare',
		condition: state => {
			if (state.transactionHistory.length === 0) return false;
			const oldest = state.transactionHistory.reduce((min, t) => {
				const date = new Date(t.date);
				return date < min ? date : min;
			}, new Date(state.transactionHistory[0].date));

			const daysDiff = Math.floor(
				(Date.now() - oldest.getTime()) / (1000 * 60 * 60 * 24),
			);
			return daysDiff >= 30;
		},
	},
	{
		id: 'legendary-player',
		name: 'Legendary Player',
		description: 'Use MoneyHero for 365 days',
		icon: '🎂',
		category: 'special',
		rarity: 'legendary',
		condition: state => {
			if (state.transactionHistory.length === 0) return false;
			const oldest = state.transactionHistory.reduce((min, t) => {
				const date = new Date(t.date);
				return date < min ? date : min;
			}, new Date(state.transactionHistory[0].date));

			const daysDiff = Math.floor(
				(Date.now() - oldest.getTime()) / (1000 * 60 * 60 * 24),
			);
			return daysDiff >= 365;
		},
	},
	{
		id: 'early-bird',
		name: 'Early Bird',
		description: 'Add a transaction before 8 AM',
		icon: '🌅',
		category: 'special',
		rarity: 'common',
		condition: state =>
			state.transactionHistory.some(t => {
				const hour = new Date(t.date).getHours();
				return hour < 8;
			}),
	},

	// ============================================
	// SPECIAL - Battle Results (3 logros)
	// ============================================
	{
		id: 'undefeated',
		name: 'Undefeated',
		description: 'Win 50 battles (income transactions)',
		icon: '🏅',
		category: 'special',
		rarity: 'epic',
		condition: state =>
			state.transactionHistory.filter(t => t.battleResult === 'victory')
				.length >= 50,
	},
	{
		id: 'survivor',
		name: 'Battle Survivor',
		description: 'Survive 100 defeats (expenses)',
		icon: '🩹',
		category: 'special',
		rarity: 'rare',
		condition: state =>
			state.transactionHistory.filter(t => t.battleResult === 'defeat')
				.length >= 100,
	},
	{
		id: 'crisis-manager',
		name: 'Crisis Manager',
		description: 'Recover from 5 critical battles',
		icon: '🚨',
		category: 'special',
		rarity: 'epic',
		condition: state =>
			state.transactionHistory.filter(t => t.battleResult === 'critical')
				.length >= 5 && state.debt === 0,
	},

	// ============================================
	// SPECIAL - Fun & Easter Eggs (4 logros)
	// ============================================
	{
		id: 'lucky-7',
		name: 'Lucky Seven',
		description: 'Complete a transaction with exactly $777',
		icon: '🎰',
		category: 'special',
		rarity: 'rare',
		condition: state => state.transactionHistory.some(t => t.amount === 777),
	},
	{
		id: 'penny-pincher',
		name: 'Penny Pincher',
		description: 'Track an expense under $1',
		icon: '🪙',
		category: 'special',
		rarity: 'common',
		condition: state =>
			state.transactionHistory.some(t => t.type === 'expense' && t.amount < 1),
	},
	{
		id: 'perfect-balance',
		name: 'Perfect Balance',
		description: 'Have exactly $1,000 balance',
		icon: '☯️',
		category: 'special',
		rarity: 'rare',
		condition: state => state.money === 1000,
	},
	{
		id: 'zero-hero',
		name: 'Zero to Hero',
		description: 'Start from $0 and reach $5,000',
		icon: '🦸‍♂️',
		category: 'special',
		rarity: 'epic',
		condition: state => state.money >= 5000,
	},
];
