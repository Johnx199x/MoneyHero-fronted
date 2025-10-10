import { useMemo } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { Transaction } from '../../../../../shared/types/index.type';

export function MonthlyComparisonChart({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const data = useMemo(() => {
		const monthlyData: Record<string, { income: number; expense: number }> = {};

		transactions.forEach(t => {
			const month = new Date(t.date).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'short',
			});

			if (!monthlyData[month]) {
				monthlyData[month] = { income: 0, expense: 0 };
			}

			if (t.type === 'income') {
				monthlyData[month].income += t.amount;
			} else {
				monthlyData[month].expense += t.amount;
			}
		});

		return Object.entries(monthlyData)
			.map(([month, values]) => ({
				month,
				income: values.income,
				expense: values.expense,
				balance: values.income - values.expense,
			}))
			.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
			.slice(-6); // Últimos 6 meses
	}, [transactions]);

	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.1)' />
				<XAxis dataKey='month' stroke='var(--text-secondary)' />
				<YAxis stroke='var(--text-secondary)' />
				<Tooltip
					contentStyle={{
						backgroundColor: 'var(--bg-secondary)',
						border: '1px solid rgba(255,255,255,0.1)',
						borderRadius: '0.5rem',
					}}
					formatter={(value: number) => `$${value.toLocaleString()}`}
				/>
				<Legend />
				<Bar
					dataKey='income'
					fill='var(--emerald)'
					name='Income'
					radius={[8, 8, 0, 0]}
				/>
				<Bar
					dataKey='expense'
					fill='var(--danger)'
					name='Expenses'
					radius={[8, 8, 0, 0]}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
