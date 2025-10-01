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

	battleResult: 'victory' | 'defeat' | 'critical';
	expGained?: number;
	expLoosed?: number;
}
