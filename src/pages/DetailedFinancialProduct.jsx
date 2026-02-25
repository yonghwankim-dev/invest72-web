
export default function DetailedFinancialProduct({product}){
    
    return (
        <div>
            <h1>금융 상품 상세 페이지</h1>
            {/* product이 존재하는 경우에만 출력 */}
            {product && (
            <div>
                    <p>상품 이름: {product.name}</p>
                    <p>상품 유형: {product.productType}</p>
                    <p>금액: {product.amount}</p>
                    <p>개월: {product.months}</p>
                    <p>이자율: {product.interestRate}</p>
                    <p>이자유형: {product.interestType}</p>
                    <p>세금유형: {product.taxType}</p>
                    <p>세금율: {product.taxRate}</p>
                    <p>시작일자: {product.startDate}</p>
            </div>
            )}
        </div>
    )
}
