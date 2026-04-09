import { useState } from "react";
import { INTEREST_TYPE_CONFIG, INVESTMENT_TYPE_CONFIG, TAX_CONFIG } from "../../constants";

export default function CreateFinancialProduct({onCreate, onCancel}){
    const [investmentType, setInvestmentType] = useState(INVESTMENT_TYPE_CONFIG.NONE.name);
    const [taxSettings, setTaxSettings] = useState(TAX_CONFIG.STANDARD);
    
    const onChangeTaxType = (e) => {
        const selectedTaxType = e.target.value;
        if(TAX_CONFIG[selectedTaxType]){
            setTaxSettings(TAX_CONFIG[selectedTaxType]);
        }
    }

    // 공통 필드: 화폐 통화
    const CurrencySelect = ()=>(
        <div className="formRow">
            <label>화폐 통화</label>
            <select name="currencyCode" defaultValue="KRW">
                <option value="KRW">원화(₩)</option>
                <option value="USD">달러($)</option>
            </select>
        </div>
    );

    return (
        <div className="card">
            <h1 className="pageTitle">상품 생성</h1>
            <div className="formRow">
                <form className="form" onSubmit={onCreate}>
                    <label>상품 유형:</label>
                    <select className="investmentType" name="investmentType" onChange={(e)=>setInvestmentType(e.target.value)}>
                        <option value={INVESTMENT_TYPE_CONFIG.NONE.name} defaultChecked>상품 유형 선택</option>
                        <option value={INVESTMENT_TYPE_CONFIG.CASH.name}>{INVESTMENT_TYPE_CONFIG.CASH.title}</option>
                        <option value={INVESTMENT_TYPE_CONFIG.DEPOSIT.name}>{INVESTMENT_TYPE_CONFIG.DEPOSIT.title}</option>
                        <option value={INVESTMENT_TYPE_CONFIG.SAVINGS.name}>{INVESTMENT_TYPE_CONFIG.SAVINGS.title}</option>
                    </select>
                    {investmentType !== INVESTMENT_TYPE_CONFIG.NONE.name &&(
                        <>
                            <div className="formRow">
                                <label>상품 이름</label>
                                <input type="text" name="name" placeholder="현금"/>
                            </div>
                            <div className="formRow">
                                <label>{investmentType === INVESTMENT_TYPE_CONFIG.SAVINGS.name ? "월 적립 금액" : "금액"}</label>
                                <input type="number" name="amount" placeholder="0" required/>
                            </div>
                            {/* 현금 필드 */}
                            {(investmentType === INVESTMENT_TYPE_CONFIG.CASH.name && (
                                <>
                                    <input type="hidden" name="months" value="0" readOnly/>
                                    <input type="hidden" name="interestRate" value="0" readOnly/>
                                    <input type="hidden" name="interestType" value={INTEREST_TYPE_CONFIG.NONE.name} readOnly/>
                                    <input type="hidden" name="taxType" value={TAX_CONFIG.NONE.name} readOnly/>
                                    <input type="hidden" name="taxRate" value="0" readOnly/>
                                </>
                            ))}

                            {/* 예금/적금 공통 필드 */}
                            {(investmentType === INVESTMENT_TYPE_CONFIG.DEPOSIT.name || investmentType === INVESTMENT_TYPE_CONFIG.SAVINGS.name) && (
                                <>
                                    <div className="formRow">
                                        <label>개월</label>
                                        <input type="number" name="months" placeholder="0" required/>
                                    </div>
                                    {investmentType === INVESTMENT_TYPE_CONFIG.SAVINGS.name && (
                                        <div className="formRow">
                                            <label>납일일</label>
                                            <input type="number" name="paymentDay" placeholder="1" min="1" max="31"/>
                                        </div>
                                    )}
                                    <div className="formRow">
                                        <label>이자율(%)</label>
                                        <input type="number" step="0.01" name="interestRate" placeholder="5" required/>
                                    </div>
                                    <div className="formRow">
                                        <label>이자유형</label>
                                        <select name="interestType" defaultValue={INTEREST_TYPE_CONFIG.COMPOUND.name}>
                                            <option value={INTEREST_TYPE_CONFIG.SIMPLE.name}>단리</option>
                                            <option value={INTEREST_TYPE_CONFIG.COMPOUND.name}>복리</option>
                                        </select>
                                    </div>
                                    <div className="formRow">
                                        <label>세금유형</label>
                                        <select name="taxType" defaultValue={TAX_CONFIG.STANDARD.name} onChange={onChangeTaxType}>
                                            <option value={TAX_CONFIG.STANDARD.name}>{TAX_CONFIG.STANDARD.title}</option>
                                            <option value={TAX_CONFIG.NON_TAX.name}>{TAX_CONFIG.NON_TAX.title}</option>
                                            <option value={TAX_CONFIG.TAX_BENEFIT.name}>{TAX_CONFIG.TAX_BENEFIT.title}</option>
                                            <option value={TAX_CONFIG.NONE.name}>{TAX_CONFIG.NONE.title}</option>
                                        </select>
                                    </div>
                                    <div className="formRow">
                                        <label>세금율(%)</label>
                                        <input type="number" 
                                                step="0.001" 
                                                name="taxRate" 
                                                value={taxSettings.rate} 
                                                readOnly={taxSettings.readOnly}
                                                onChange={(e)=>setTaxSettings({...taxSettings, rate: e.target.value})}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="formRow">
                                <label>시작일자</label>
                                <input type="date" name="startDate" defaultValue={new Date().toISOString().split('T')[0]}/>
                            </div>

                            <CurrencySelect/>
                            <div className="actions">
                            <button className="buttonPrimary" type="submit">생성</button>
                            <button className="buttonSecondary" type="button" onClick={onCancel}>취소</button>
                        </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
