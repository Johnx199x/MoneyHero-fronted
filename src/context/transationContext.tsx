/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	AchievementService,
	DashboardService,
	TransactionService,
} from '../services/ApiServices';
import type { IAchievement } from '../shared/types/achievement';
import type { IDashboardStats, Transaction } from '../shared/types/index.type';

interface TransactionContextType {
	stats: IDashboardStats | null;
	transactions: Transaction[];
	achievements: IAchievement[];
	loading: boolean;
	refreshData: () => Promise<void>;
	createTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
	deleteTransaction: (id: string) => Promise<void>;
	updateTransaction: (
		id: string,
		updates: Partial<Transaction>,
	) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
	undefined,
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
	const [stats, setStats] = useState<IDashboardStats | null>(null);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [achievements, setAchievements] = useState<IAchievement[]>([]);
	const [loading, setLoading] = useState(false);

	const refreshData = async () => {
		setLoading(true);
		try {
			const [statsResponse, transactionsResponse,achievementsResponse] = await Promise.all([
				DashboardService.getStats(),
				TransactionService.getAll(),
				AchievementService.getAchievement(),
			]);

			if (statsResponse.success && statsResponse.data) {
				setStats(statsResponse.data);
			}

			if (transactionsResponse.success && transactionsResponse.data) {
				setTransactions(transactionsResponse.data);
			}
			if (achievementsResponse.success && achievementsResponse.data) {
				setAchievements(achievementsResponse.data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
		try {
			const response = await TransactionService.create(transaction);
			if (response.success) {
				await refreshData();
			}
		} catch (error) {
			console.error('Error creating transaction:', error);
			throw error;
		}
	};

	const deleteTransaction = async (id: string) => {
		try {
			const response = await TransactionService.delete(id);
			if (response.success) {
				await refreshData(); // Refresca todo después de eliminar
			}
		} catch (error) {
			console.error('Error deleting transaction:', error);
			throw error;
		}
	};

	const updateTransaction = async (
		id: string,
		updates: Partial<Transaction>,
	) => {
		try {
			const response = await TransactionService.update(id, updates);
			if (response.success) {
				await refreshData(); // Refresca todo después de actualizar
			}
		} catch (error) {
			console.error('Error updating transaction:', error);
			throw error;
		}
	};

	useEffect(() => {
		refreshData();
	}, []);

	return (
		<TransactionContext.Provider
			value={{
				stats,
				transactions,
				achievements,
				loading,
				refreshData,
				createTransaction,
				deleteTransaction,
				updateTransaction,
			}}>
			{children}
		</TransactionContext.Provider>
	);
};

export const useTransactionContext = () => {
	const context = useContext(TransactionContext);
	if (!context) {
		throw new Error(
			'useTransactionContext must be used within TransactionProvider',
		);
	}
	return context;
};
