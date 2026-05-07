import styles from './DashboardProduct.module.css'

export default function DashboardProduct({statistics}){
    if(statistics === null){
        return <div className={styles.loading}>데이터 로딩중...</div>
    }

    if(!statistics.totalBalance || !statistics.totalEstimatedInterest){
        return <div className={styles.error}>통계 정보를 불러오는데 실패했습니다.</div>;
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>금융 상품 통계</h1>
                <div className={styles.grid}>
                    <div className={styles.item}>
                        <label className={styles.label}>총자산</label>
                        <span className={styles.value}>
                            {statistics.totalBalance.amount.toLocaleString()}
                            <em className={styles.unit}>{statistics.totalBalance.currency.name}</em>
                        </span>
                    </div>

                    <div className={styles.item}>
                        <label className={styles.label}>예상 이자</label>
                        <span className={`${styles.value} ${styles.highlight}`}>
                            {statistics.totalEstimatedInterest.amount.toLocaleString()}
                            <em className={styles.unit}>{statistics.totalEstimatedInterest.currency.name}</em>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}