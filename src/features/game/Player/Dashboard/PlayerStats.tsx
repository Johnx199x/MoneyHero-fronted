import './PlayerStats.css';
import { useTransactionContext } from '../../../../context/transationContext';
export default function PlayerStats() {
	const { stats, loading } = useTransactionContext();

	if (loading || !stats) {
		return <div>Loading...</div>;
	}

	const { player_name, money, debt, level, exp, exp_to_next_level, percent_level } = stats;
	
	// const [showNameEdit, setShowNameEdit] = useState(false);
	// const [newName, setNewName] = useState(player_name);

	// const handleNameChange = () => {
	// 	setShowNameEdit(false);
	// };

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <explanation>
		<div className='player-header' id='dashboard'>
			<span className='player-title-section'>
				<h1 className='player-title'>⚔️ {player_name}</h1>

				
				{/* Change name Interface 
				{!showNameEdit ? (
					<button
						type='button'
						className='edit-name-btn'
						onClick={() => setShowNameEdit(true)}>
						✏️ Edit
					</button>
				) : (
					<div className='name-edit-form'>
						<input
							type='text'
							value={newName}
							onChange={e => setNewName(e.target.value)}
							className='name-input'
							onKeyPress={e => e.key === 'Enter' && handleNameChange()}
						/>
						<button
							type='button'
							onClick={handleNameChange}
							className='name-save-btn'>
							✓
						</button>
						<button
							type='button'
							onClick={() => setShowNameEdit(false)}
							className='name-cancel-btn'>
							✗
						</button>
					</div>
				)} */}
			</span>

			{/* Stats Grid */}

			<div className='stats-grid'>
				<div className='stat-card money'>
					<span style={{ display: 'block' }} className='stat-icon'>
						💰
					</span>
					<span style={{ display: 'block' }} className='stat-label'>
						Money
					</span>
					<span style={{ display: 'block' }} className='stat-value money'>
						${money.toLocaleString()}
					</span>
				</div>
				<div className='stat-card money'>
					<span style={{ display: 'block' }} className='stat-icon'>
						💸
					</span>
					<span style={{ display: 'block' }} className='stat-label'>
						Debt
					</span>
					<span style={{ display: 'block' }} className='stat-value debt'>
						${debt}
					</span>
				</div>

				<div className='stat-card level'>
					<span style={{ display: 'block' }} className='stat-icon'>
						⚡
					</span>
					<span style={{ display: 'block' }} className='stat-label'>
						Level
					</span>
					<span style={{ display: 'block' }} className='stat-value level'>
						{level}
					</span>
				</div>

				<div className='stat-card exp'>
					<span style={{ display: 'block' }} className='stat-icon'>
						🌟
					</span>
					<span style={{ display: 'block' }} className='stat-label'>
						Experience
					</span>
					<span style={{ display: 'block' }} className='stat-value exp'>
						{exp}/{exp_to_next_level}
					</span>
				</div>
			</div>

			{/* EXP Progress Bar */}
			<div className='progress-section'>
				<div className='progress-labels'>
					<span>Level {level}</span>
					<span>
						{percent_level}% to Level {level + 1}
					</span>
				</div>
				<div className='progress-bar-container'>
					<div
						className='progress-bar-fill'
						style={{ width: `${percent_level}%` }}
					/>
				</div>
			</div>
		</div>
	);
}
