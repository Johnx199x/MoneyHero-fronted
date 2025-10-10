import PlayerAnalytics from "./Charts/PlayerAnalytics";
import PlayerDashboard from "./Dashboard/PlayerDashBoard";
import PlayerHistory from "./TransactionHistory/PlayerHistory";
export default function GamePage(){


    return(
    <>
        <PlayerDashboard />
        <PlayerAnalytics />
		<PlayerHistory />

    </>

    )
}