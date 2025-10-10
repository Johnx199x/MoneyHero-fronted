import { useMemo } from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { Transaction } from '../../../../../shared/types/index.type';

interface BalanceChartProps {
	transactions: Transaction[];
}

export function BalanceChart({ transactions }: BalanceChartProps) {
	const data = useMemo(() => {
		const sorted = [...transactions].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);

		let balance = 0;
		return sorted.map(t => {
			balance += t.type === 'income' ? t.amount : -t.amount;
			return {
				date: new Date(t.date).toLocaleDateString('es-ES', {
					month: 'short',
					day: 'numeric',
				}),
				balance: balance,
				income: t.type === 'income' ? t.amount : 0,
				expense: t.type === 'expense' ? t.amount : 0,
			};
		});
	}, [transactions]);

	return (
		<ResponsiveContainer width='100%' height={300}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.1)' />
				<XAxis
					dataKey='date'
					stroke='var(--text-secondary)'
					style={{ fontSize: '0.875rem' }}
				/>
				<YAxis
					stroke='var(--text-secondary)'
					style={{ fontSize: '0.875rem' }}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: 'var(--bg-secondary)',
						border: '1px solid rgba(255,255,255,0.1)',
						borderRadius: '0.5rem',
						color: 'var(--text-primary)',
					}}
					formatter={(value: number) => `$${value.toLocaleString()}`}
				/>
				<Legend />
				<Line
					type='monotone'
					dataKey='balance'
					stroke='var(--emerald)'
					strokeWidth={3}
					dot={{ fill: 'var(--emerald)', r: 4 }}
					name='Balance'
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
