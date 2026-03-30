

export default function EditFinancialProduct({product, onEdit, onCancel}){
        return (
        <div className="card">
            <h1 className="pageTitle">상품 수정</h1>
            <form className="form" onSubmit={onEdit}>
                <input type="hidden" name="productId" value={product?.id}/>
                <input type="hidden" name="userId" value={product?.userId}/>
                <input type="hidden" name="createdAt" value={product?.createdAt}/>
                <div className="formRow">
                    <label>상품 유형:</label>
                    <select name="investmentType" defaultValue={product?.investmentType}>
                        <option value="CASH">현금</option>
                        <option value="DEPOSIT">예금</option>
                        <option value="SAVINGS">적금</option>
                    </select>
                </div>
                <div className="formRow">
                    <label>상품 이름:</label>
                    <input type="text" name="name" defaultValue={product?.name}/>
                </div>
                <div className="formRow">
                    <label>금액:</label>
                    <input type="number" name="amount" defaultValue={product?.amount}/>
                </div>
                <div className="formRow">
                    <label>개월:</label>
                    <input type="number" name="months" defaultValue={product?.months}/>
                </div>
                {/* 적금 상품인 경우에는 납입일을 표시함 */}
                {product?.investmentType === "SAVINGS" && (
                    <div className="formRow">
                        <label>납입일:</label>
                        <input type="number" name="paymentDay" defaultValue={product?.paymentDay}/>
                    </div>
                )}
                <div className="formRow">
                    <label>이자율(%):</label>
                    <input type="number" step="0.01" name="interestRate" defaultValue={product?.interestRate * 100}/>
                </div>
                <div className="formRow">
                    <label>이자유형:</label>
                    <select name="interestType" defaultValue={product?.interestType}>
                        <option value="SIMPLE">단리</option>
                        <option value="COMPOUND">복리</option>
                        <option value="NONE">없음</option>
                    </select>
                </div>
                <div className="formRow">
                    <label>세금유형:</label>
                    <select name="taxType" defaultValue={product?.taxType}>
                        <option value="STANDARD">과세</option>
                        <option value="NON_TAX">비과세</option>
                        <option value="TAX_BENEFIT">세금우대</option>
                        <option value="NONE">없음</option>
                    </select>
                </div>
                <div className="formRow">
                    <label>세금율(%):</label>
                    <input type="number" step="0.001" name="taxRate" defaultValue={product?.taxRate * 100}/>
                </div>
                <div className="formRow">
                    <label>시작일자:</label>
                    <input type="date" name="startDate" defaultValue={product?.startDate}/>
                </div>
                <div className="formRow">
                    <label>화폐 통화</label>
                    <select name="currencyCode" defaultValue={product?.productCurrency.code}>
                        <option value="KRW">원화(₩)</option>
                        <option value="USD">달러($)</option>
                    </select>
                </div>
                <div className="actions">
                    <button className="buttonPrimary" type="submit">수정</button>
                    <button className="buttonSecondary" type="button" onClick={onCancel}>취소</button>
                </div>
            </form>
        </div>
    );
}