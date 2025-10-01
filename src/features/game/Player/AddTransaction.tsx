/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import './AddTransaction.css';
import type React from 'react';
import { useState } from 'react';
import {
	expenseCategories,
	incomeCategories,
} from '../../../shared/constants';
import type { Category, Transaction } from '../../../shared/types/index.type';
import { usePlayerStore } from './store/playerStore';

interface ModalProps {
	setShowForm: (show: boolean) => void;
	type: 'income' | 'expense';
}

export const AddTransaction = ({ setShowForm, type }: ModalProps) => {
	const currentDate =new Date().toISOString()

	const categories = type === 'income' ? incomeCategories : expenseCategories;

	const isExpense = type === 'expense';
	const initialTransaction: Transaction = {
		id: '',
		name: '',
		type: type,
		amount: 0,
		category: 'other',
		description: '',
		date: currentDate,
		battleResult: !isExpense ? 'victory' : 'defeat',
	};

	const [warning, setWarning] = useState<string>('');
	const [newTransaction, setNewTransaction] = useState<Transaction>(initialTransaction);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		 setWarning('');

		setNewTransaction({
			...newTransaction,
			[name]: value,
		});
	};
	const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setNewTransaction({
			...newTransaction,
			category: value as Category
		});
	};

	const { addTransaction } = usePlayerStore();

	const handleModal = () => {
		newTransaction.amount = Number(newTransaction.amount);

		if (!newTransaction.name.trim()) {
        	setWarning('Transaction name is required');
        	return;
    }
		if (!newTransaction.date) {
        	setWarning('Date is required');
       	 	return;
    }
	const num = Number(newTransaction.amount);
    
    	if (num <= 0) {
        	setWarning('Amount must be positive');
        	return;
    }
		
			addTransaction({
        		...newTransaction,
        		amount: num});
   		 	setShowForm(false);
    		setNewTransaction(initialTransaction);
    		setWarning('');
	};

	return (
		<div className='modal-overlay' onClick={() => setShowForm(false)}>
			<form className='modal-content' onClick={e => e.stopPropagation()}>
				<h3
					className={`modal-title ${isExpense ? 'spend-money' : 'add-money'}`}>
					{isExpense ? '💸 Spend Money' : '💰 Add Money'}
				</h3>
				<div className='form-group'>
					<label htmlFor='TransactionName' className='form-label'>
						Transaction name
					</label>
					<input required
						type='text'
                        name='name'
                        value={newTransaction.name}
						id='TransactionName'
						onChange={handleChange}

						placeholder={
							isExpense
								? 'Coffee, Gym membership, Rent...'
								: 'Salary, Freelance project, Bonus...'
						}
						className='form-input'
					/>
					<label htmlFor='MoneyDesc' className='form-label'>
						Description (optional)
					</label>
					<input 
						id='MoneyDesc'
						type='text'
                        name='description'
						value={newTransaction.description}
						onChange={handleChange}
						placeholder={
							isExpense
								? 'Paid with credit card, dinner with friends'
								: 'Bank transfer, bonus, freelance work'
						}
						className='form-input'
					/>
					<label htmlFor='TransactionAmount' className='form-label'>
						Amount ($)
					</label>
					<input required
						id='TransactionAmount'
						type='number'
                        name='amount'
						value={newTransaction.amount}
						onChange= {handleChange}
						placeholder='0.00'
						className='form-input'
					/>
					<label htmlFor='TransactionCategory' className='form-label'>
						Transaction Category
					</label>
					<select id='TransactionCategory' value={newTransaction.category} onChange={handleChangeSelect} className='form-input' >
						{categories.map((cat) => {
							 return <option  key={cat} value={cat}>{cat}</option>
						})}
					</select>

                    <label htmlFor='TransactionDate' className='form-label'>
						Transaction Date
					</label>
					<input required
						type='date'
                        value={newTransaction.date}
						onChange={handleChange}
                        name='date'
						id='TransactionDate'
						
						className='form-input'
					/>
				</div>
				<div className='modal-actions'>
					<button
						type='button'
						className='modal-btn cancel'
						onClick={() => setShowForm(false)}>
						Cancel
					</button>
					<button
						type='button'
						className={`modal-btn submit ${isExpense ? 'spend-money' : 'add-money'}`}
						onClick={handleModal}
						disabled={warning !==''}
						>
						{isExpense ? 'Spend Money' : 'Add Money'}
					</button>

                    <span style={{display:'block'}}>{warning}</span>
				</div>
			</form>
		</div>
	);
};
