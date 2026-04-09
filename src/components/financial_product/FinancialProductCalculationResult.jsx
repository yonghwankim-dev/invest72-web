
import { useState } from "react";
import styles from "../../FinancialProductCalculationResult.module.css";

export default function FinancialProductCalculationResult({result}){
    const [showYearly, setShowYearly] = useState(true);

    if(!result){
        return <p className={styles.emptyMessage}>수익 계산 결과를 불러오는 중입니다...</p>;
    }
    const currencyUnit = result.productCurrency.unit;
    const details = showYearly ? result.yearlyDetails : result.monthlyDetails;
    // 통화 포맷팅 함수
    const formatCurrency = (amount) => `${amount?.toLocaleString() || 0} ${currencyUnit}`;

    return (
        <div className={styles.section}>
            <div className={styles.summaryGrid}>
                <p className={styles.summaryItem}><span>총 투자금</span><strong>{formatCurrency(result.totalInvestment)}</strong></p>
                <p className={styles.summaryItem}><span>총 이자</span><strong>{formatCurrency(result.totalInterest)}</strong></p>
                <p className={styles.summaryItem}><span>총 세금({result.taxType}, {result.taxPercent})</span><strong>{formatCurrency(result.totalTax)}</strong></p>
                <p className={styles.summaryItem}><span>총 수익</span><strong>{formatCurrency(result.totalProfit)}</strong></p>
            </div>

            {/* 년/월 토글 버튼*/}
            <div className={styles.toggleButtons}>
                <button className={`${styles.toggleButton} ${showYearly ? styles.active : ""}`} onClick={() => setShowYearly(true)}>년도별</button>
                <button className={`${styles.toggleButton} ${!showYearly ? styles.active : ""}`} onClick={() => setShowYearly(false)}>월별</button>
            </div>
            {/* 통합 테이블 출력 */}
            <CalculationTable data={details} isYearly={showYearly} formatCurrency={formatCurrency}/>
        </div>
    );
}

function CalculationTable({data, isYearly, formatCurrency}){
    if(!data || data.length === 0){
        return <p className={styles.emptyMessage}>{isYearly ? "년도별" : "월별"} 계산 결과가 없습니다.</p>;
    }
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{isYearly ? "년" : "월"}</th>
                        <th>원금</th>
                        <th>이자</th>
                        <th>수익</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((detail, index) => {
                        const timeValue = isYearly ? detail.year : detail.month;
                        const isHighlight = !isYearly && timeValue % 12 === 0;
                        return (
                            <tr key={index} className={isHighlight ? styles.highlightRow : ""}>
                                <td>{timeValue}</td>
                                <td>{formatCurrency(detail.principal)}</td>
                                <td>{formatCurrency(detail.interest)}</td>
                                <td>{formatCurrency(detail.profit)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
