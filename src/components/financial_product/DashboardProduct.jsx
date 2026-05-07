
export default function DashboardProduct({statistics}){
    if(!statistics){
        return <div>데이터 로딩중...</div>
    }
    return (
        <>
            <div>
                <p>
                    <label>총자산</label>
                    <span>{statistics.totalBalance.amount} {statistics.totalBalance.currency.name}</span>
                </p>
                <p>
                    <label>예상이자</label>
                    <span>{statistics.totalEstimatedInterest.amount} {statistics.totalEstimatedInterest.currency.name}</span>
                </p>
            </div>
        </>
    )
}