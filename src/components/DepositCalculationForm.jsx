
export default function DepositCalculationForm({onCalculate}){
    return (
        <form id="investmentForm" onSubmit={onCalculate}>
            <label for="type">투자 유형:</label>
            <select id="type" name="type">
                <option value="예금" selected>예금</option>
            </select><br/><br/>

            <label for="amountType">금액 유형:</label>
            <select id="amountType" name="amountType">
                <option value="일시불" selected>일시불</option>
            </select><br/><br/>

            <label for="amount">금액:</label>
            <input type="number" id="amount" name="amount" value="1000000" required/><br/><br/>

            <label for="periodType">기간 유형:</label>
            <select id="periodType" name="periodType">
                <option value="월">월</option>
                <option value="년" selected>년</option>
            </select><br/><br/>

            <label for="periodValue">기간 값:</label>
            <input type="number" id="periodValue" name="periodValue" value="1" required/><br/><br/>

            <label for="interestType">이자 유형:</label>
            <select id="interestType" name="interestType">
                <option value="단리" selected>단리</option>
                <option value="복리">복리</option>
            </select><br/><br/>

            <label for="annualInterestRate">연이자율 (%):</label>
            <input type="number" step="0.01" id="annualInterestRate" name="annualInterestRate"
                min="0.00" max="99.99" value="5.00" required/><br/><br/>

            <label for="taxType">세금 유형:</label>
            <select id="taxType" name="taxType">
                <option value="일반과세" selected>일반과세</option>
                <option value="비과세">비과세</option>
                <option value="세금우대">세금우대</option>
            </select><br/><br/>

            <label for="taxRate">세율 (%):</label>
            <input type="number" step="0.01" id="taxRate" name="taxRate" min="0.00" max="99.99" value="15.4" required />
            <br/><br/>
            <button type="submit">계산하기</button>
        </form>           
    );
}