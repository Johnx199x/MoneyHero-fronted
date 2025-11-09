type IncomeCategory =
	| 'salary'
	| 'business'
	| 'investment'
	| 'gift'
	| 'freelance'
	| 'refunds'
	| 'other';

type ExpenseCategory =
	| 'food'
	| 'transport'
	| 'housing'
	| 'entertainment'
	| 'health'
	| 'education'
	| 'shopping'
	| 'travel'
	| 'debt'
	| 'other';

export type Category = IncomeCategory | ExpenseCategory;

export interface Transaction {
	id: string;
	name: string;
	type: 'income' | 'expense';
	amount: number;
	category: Category;
	description?: string;
	date: string;

	battle_result: 'victory' | 'defeat' | 'critical';
	exp_gained?: number;
	exp_lost?: number;
}
export interface IFilter {
	type?: 'income' | 'expense' | undefined;
	category?: string | undefined;
}
