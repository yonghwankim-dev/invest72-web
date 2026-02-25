

export default function CreateFinancialProduct({handleCreate, onCancel}){
    return (
        <div>
            <h1>상품 생성</h1>
            <form onSubmit={handleCreate}>
                <div>
                    <label>상품 이름:</label>
                    <input type="text" name="name"/>
                </div>
                <div>
                    <label>상품 유형:</label>
                    <select name="productType">
                        <option value="CASH">현금</option>
                        <option value="DEPOSIT">예금</option>
                        <option value="SAVINGS">적금</option>
                    </select>
                </div>
                <div>
                    <label>금액:</label>
                    <input type="number" name="amount"/>
                </div>
                <div>
                    <label>개월:</label>
                    <input type="number" name="months"/>
                </div>
                <div>
                    <label>이자율:</label>
                    <input type="number" step="0.01" name="interestRate" placeholder="0.05"/>
                </div>
                <div>
                    <label>이자유형:</label>
                    <select name="interestType">
                        <option value="SIMPLE">단리</option>
                        <option value="COMPOUND">복리</option>
                        <option value="NONE">없음</option>
                    </select>
                </div>
                <div>
                    <label>세금유형:</label>
                    <select name="taxType">
                        <option value="STANDARD">과세</option>
                        <option value="NON_TAX">비과세</option>
                        <option value="TAX_BENEFIT">세금우대</option>
                        <option value="NONE">없음</option>
                    </select>
                </div>
                <div>
                    <label>세금율:</label>
                    <input type="number" step="0.001" name="taxRate" placeholder="0.154"/>
                </div>
                <div>
                    <label>시작일자:</label>
                    <input type="date" name="startDate"/>
                </div>
                <button type="submit">생성</button>
                <button type="button" onClick={onCancel}>취소</button>
            </form>
        </div>
    );
}
