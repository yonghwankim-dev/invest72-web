
export default function DashboardProduct({statistics}){
    if(!statistics){
        return <div>데이터 로딩중...</div>
    }
    return (
        <>
            <div className="card">
                <h1 className="pageTitle">금융 상품 통계</h1>
                <p className="statistics_row">
                    <label>총자산:</label>
                    <span>{statistics.totalBalance.amount} {statistics.totalBalance.currency.name}</span>
                </p>
                <p className="statistics_row">
                    <label>예상 이자:</label>
                    <span>{statistics.totalEstimatedInterest.amount} {statistics.totalEstimatedInterest.currency.name}</span>
                </p>
            </div>
        </>
    )
}