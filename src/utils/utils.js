
/**
 * 소수점 비율 데이터를 퍼센트 문자열로 변환
 * @param {number|string} rate - 0.05와 같은 비율 데이터
 * @param {number} decimals - 표시할 소수점 자리수 (기본값 2)
 * @returns {string} 퍼센트 문자열 (ex: 5.12%, 5%)
 */
export function formatPercent(rate, decimal = 2){
    if(rate === undefined || rate === null || isNaN(rate)){
        return "0%";
    }
    const percent = Number(rate) * 100;
    return `${parseFloat(percent.toFixed(decimal))}%`;
}

/**
 * 금융 상품의 만기일이 '없음(무한대)'인지 확인하는 함수
 * @param {string} expirationDate - "2026-12-31" 또는 "+999999999-12-31"
 * @returns {boolean} - 만기일이 없으면 true, 있으면 false
 */
export function isNoExpiration(date){
    if(!date){
        return true;
    }
    return date.includes("9999");
}