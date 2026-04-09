import { INVESTMENT_TYPE_CONFIG } from "../../constants";
import { formatPercent } from "../../utils/utils";

export default function FinancialProducts({products, onClickProduct}){
    const handleProductClick = (e, productId) => {
        e.preventDefault();
        onClickProduct(productId);
    };
    const rows = products
        .filter(product => product && product.id)
        .map(product=>{
            return <tr key={product.id}>
                    <td>
                        <a className="tableLink" href={`/products/${product.id}`} onClick={(e) => handleProductClick(e, product.id)}>
                            {product.name}
                        </a>
                    </td>
                    <td>{INVESTMENT_TYPE_CONFIG[product.investmentType].title}</td>
                    <td>{formatPercent(product.interestRate)}</td>
                    <td>{product.startDate}</td>
                    {/* 만기일이 최대인 경우에는 "만기일 없음"으로 표시 */}
                    <td>{product.expirationDate === "+999999999-12-31" ? "만기일 없음" : product.expirationDate}</td>
                    <td>{product.balance.toLocaleString()} {product.productCurrency.unit}</td>
                    <td>{product.expectedInterest.toLocaleString()} {product.productCurrency.unit}</td>
                    <td>{(product.progress * 100).toFixed(2)}%</td>
                    <td>D-{product.remainingDays}</td>
                </tr>
        })
    return(
        <div className="card">
            <h1 className="pageTitle">금융 상품 목록</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>투자 유형</th>
                        <th>연 이자율</th>
                        <th>시작일</th>
                        <th>만기일</th>
                        <th>현재 잔액(원금)</th>
                        <th>예상 이자</th>
                        <th>진행률</th>
                        <th>남은 일수</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}