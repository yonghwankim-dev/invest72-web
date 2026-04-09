
/**
 * 소수점 비율 데이터를 퍼센트 문자열로 변환
 * @param {number|string} rate - 0.05와 같은 비율 데이터
 * @param {number} decimals - 표시할 소수점 자리수 (기본값 2)
 */
export function formatPercent(rate, decimal = 2){
    if(rate === undefined || rate === null || isNaN(rate)){
        return "0%";
    }
    const percent = Number(rate) * 100;
    return `${parseFloat(percent.toFixed(decimal))}%`;
}