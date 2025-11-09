/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { useMemo } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { Transaction } from '../../../../../shared/types/index.type';

export function ExpProgressChart({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const data = useMemo(() => {
		const sorted = [...transactions].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);

		let totalExp = 0;
		return sorted.map(t => {
			const expChange = (t.exp_gained || 0) - (t.exp_lost || 0);
			totalExp += expChange;

			return {
				date: new Date(t.date).toLocaleDateString('es-ES', {
					month: 'short',
					day: 'numeric',
				}),
				exp: Math.max(0, totalExp),
			};
		});
	}, [transactions]);

	return (
		<ResponsiveContainer width='100%' height={250}>
			<AreaChart data={data}>
				<defs>
					<linearGradient id='expGradient' x1='0' y1='0' x2='0' y2='1'>
						<stop
							offset='5%'
							stopColor='var(--mystic-blue)'
							stopOpacity={0.8}
						/>
						<stop offset='95%' stopColor='var(--mystic-blue)' stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.1)' />
				<XAxis dataKey='date' stroke='var(--text-secondary)' />
				<YAxis stroke='var(--text-secondary)' />
				<Tooltip
					contentStyle={{
						backgroundColor: 'var(--bg-secondary)',
						border: '1px solid rgba(255,255,255,0.1)',
						borderRadius: '0.5rem',
					}}
					formatter={(value: number) => `${value.toFixed(0)} EXP`}
				/>
				<Area
					type='monotone'
					dataKey='exp'
					stroke='var(--mystic-blue)'
					strokeWidth={2}
					fillOpacity={1}
					fill='url(#expGradient)'
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
