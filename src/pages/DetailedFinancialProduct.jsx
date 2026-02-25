
export default function DetailedFinancialProduct({product}){
    
    return (
        <div className="card">
            <h1 className="pageTitle">금융 상품 상세 페이지</h1>
            {/* product이 존재하는 경우에만 출력 */}
            {product && (
            <div className="details">
                    <p><span>상품 이름</span><strong>{product.name}</strong></p>
                    <p><span>상품 유형</span><strong>{product.productType}</strong></p>
                    <p><span>금액</span><strong>{product.amount}</strong></p>
                    <p><span>개월</span><strong>{product.months}</strong></p>
                    <p><span>이자율</span><strong>{product.interestRate}</strong></p>
                    <p><span>이자유형</span><strong>{product.interestType}</strong></p>
                    <p><span>세금유형</span><strong>{product.taxType}</strong></p>
                    <p><span>세금율</span><strong>{product.taxRate}</strong></p>
                    <p><span>시작일자</span><strong>{product.startDate}</strong></p>
            </div>
            )}
        </div>
    )
}
