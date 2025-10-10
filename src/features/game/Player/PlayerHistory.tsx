import TransactionCard from './Components/TransactionCard'
import './PlayerHistory.css'
import { usePlayerStore } from './store/playerStore'

export default function PlayerHistory() {

    
    const { transactionHistory } = usePlayerStore()

    const getBattleIcon = (result: string) => {
        switch(result) {
            case 'victory': return '⚔️'
            case 'defeat': return '💀'
            case 'critical': return '⭐'
            default: return '⚔️'
        }
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
                        <TransactionCard key={transaction.id} transaction = {transaction} battleIcon={getBattleIcon(transaction.battleResult)} />
                    ))
                )}
            </div>
        </section>
    )
}