import './PlayerHistory.css'
import { usePlayerStore } from './store/playerStore'

export default function PlayerHistory() {

    // todo: crear un componente para cada historial y este separarlo en head y body 
    
    const { transactionHistory } = usePlayerStore()

    const getBattleIcon = (result: string) => {
        switch(result) {
            case 'victory': return '⚔️'
            case 'defeat': return '💀'
            case 'critical': return '⭐'
            default: return '⚔️'
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
        })
    }

    return (
        <section className='history-section'>
            <span className="section-title-2">Transaction History</span>
            <div className="history-container">
                {transactionHistory.length === 0 ? (
                    <span className="empty-history">
                        <p>There are no transactions to display</p>
                    </span>
                ) : (
                    transactionHistory.map((transaction) => (
                        <div 
                            key={transaction.id} 
                            className={`transaction-card ${transaction.type}`}
                        >
                            <div className="transaction-header">
                                <div className="transaction-title">
                                    <span className="battle-icon">
                                        {getBattleIcon(transaction.battleResult)}
                                    </span>
                                    <h3>{transaction.name}</h3>
                                </div>
                                <span className={`transaction-amount ${transaction.type}`}>
                                    {transaction.type === 'income' ? '+' : '-'}
                                    ${Math.abs(transaction.amount).toLocaleString()}
                                </span>
                            </div>

                            <div className="transaction-body">
                                <div className="transaction-info">
                                    <span className="info-label">Category:</span>
                                    <span className="info-value">{transaction.category}</span>
                                </div>

                                {transaction.description && (
                                    <div className="transaction-info">
                                        <span className="info-label">Description:</span>
                                        <span className="info-value">{transaction.description}</span>
                                    </div>
                                )}

                                <div className="transaction-info">
                                    <span className="info-label">Battle result:</span>
                                    <span className={`battle-result ${transaction.battleResult}`}>
                                        {transaction.battleResult === 'victory' ? 'Victort' : 
                                         transaction.battleResult === 'defeat' ? 'Defeat' : 
                                         'Critical'}
                                    </span>
                                </div>

                                {transaction.expGained && (
                                    <div className="transaction-info">
                                        <span className="info-label">Gained exp:</span>
                                        <span className="exp-gained">+{transaction.expGained.toFixed(2)} EXP</span>
                                    </div>
                                )}

                                {transaction.expLoosed && (
                                    <div className="transaction-info">
                                        <span className="info-label">Losed exp:</span>
                                        <span className="exp-lost">-{transaction.expLoosed.toFixed(2)} EXP</span>
                                    </div>
                                )}

                                <div className="transaction-date">
                                    <span>{formatDate(transaction.date)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}