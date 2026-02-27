
import { useState } from "react";
import styles from "./FinancialProductCalculationResult.module.css";

export default function FinancialProductCalculationResult({result}){
    const [showYearly, setShowYearly] = useState(true);

    if(!result){
        return <p className={styles.emptyMessage}>수익 계산 결과를 불러오는 중입니다...</p>;
    }
    
    return (
        <div className={styles.section}>
            <div className={styles.summaryGrid}>
                <p className={styles.summaryItem}><span>총 투자금</span><strong>{result.totalInvestment.toLocaleString()}원</strong></p>
                <p className={styles.summaryItem}><span>총 이자</span><strong>{result.totalInterest.toLocaleString()}원</strong></p>
                <p className={styles.summaryItem}><span>총 세금({result.taxType} {result.taxPercent})</span><strong>{result.totalTax.toLocaleString()}원</strong></p>
                <p className={styles.summaryItem}><span>총 수익</span><strong>{result.totalProfit.toLocaleString()}원</strong></p>
            </div>

            {/** 년도별/월별 선택하여 출력, 기본: 년도별 */}
            <div className={styles.toggleButtons}>
                <button className={styles.toggleButton} onClick={() => setShowYearly(true)}>년도별</button>
                <button className={styles.toggleButton} onClick={() => setShowYearly(false)}>월별</button>
            </div>
            {showYearly ? (
                <FinancialProductYearlyCalculationResult result={result} />
            ) : (
                <FinancialProductMonthlyCalculationResult result={result} />
            )}
        </div>
    );
}

function FinancialProductYearlyCalculationResult({result}){
    if(!result){
        return <p className={styles.emptyMessage}>수익 계산 결과를 불러오는 중입니다...</p>;
    }
    
    return (
        <div className={styles.section}>
        {result.yearlyDetails.length === 0 ? (
            <p className={styles.emptyMessage}>연별 계산 결과가 없습니다.</p>
        ) : (
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>년</th>
                            <th>원금</th>
                            <th>이자</th>
                            <th>수익</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.yearlyDetails.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.year}</td>
                                <td>{detail.principal.toLocaleString()}원</td>
                                <td>{detail.interest.toLocaleString()}원</td>
                                <td>{detail.profit.toLocaleString()}원</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
    );
}

function FinancialProductMonthlyCalculationResult({result}){
    if(!result){
        return <p className={styles.emptyMessage}>수익 계산 결과를 불러오는 중입니다...</p>;
    }
    
    return (
        <div className={styles.section}>
        {result.monthlyDetails.length === 0 ? (
            <p className={styles.emptyMessage}>월별 계산 결과가 없습니다.</p>
        ) : (
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>월</th>
                            <th>원금</th>
                            <th>이자</th>
                            <th>수익</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.monthlyDetails.map((detail, index) => (
                            // month가 연말인 경우 강조 표시
                            <tr key={index} className={detail.month % 12 === 0 ? styles.highlightRow : ""}>
                                <td>{detail.month}</td>
                                <td>{detail.principal.toLocaleString()}원</td>
                                <td>{detail.interest.toLocaleString()}원</td>
                                <td>{detail.profit.toLocaleString()}원</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
    );
}