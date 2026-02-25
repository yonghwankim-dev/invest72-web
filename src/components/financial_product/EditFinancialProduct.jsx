

export default function EditFinancialProduct({product, onEdit, onCancel}){
        return (
        <div className="card">
            <h1 className="pageTitle">상품 수정</h1>
            <form className="form" onSubmit={onEdit}>
                <input type="hidden" name="id" value={product?.id}/>
                <div className="formRow">
                    <label>상품 유형:</label>
                    <select name="productType" defaultValue={product?.productType}>
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
                <div className="formRow">
                    <label>이자율:</label>
                    <input type="number" step="0.01" name="interestRate" defaultValue={product?.interestRate}/>
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
                    <label>세금율:</label>
                    <input type="number" step="0.001" name="taxRate" defaultValue={product?.taxRate}/>
                </div>
                <div className="formRow">
                    <label>시작일자:</label>
                    <input type="date" name="startDate" defaultValue={product?.startDate}/>
                </div>
                <div className="actions">
                    <button className="buttonPrimary" type="submit">수정</button>
                    <button className="buttonSecondary" type="button" onClick={onCancel}>취소</button>
                </div>
            </form>
        </div>
    );
}