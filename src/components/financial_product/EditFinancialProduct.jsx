import { useState } from "react";
import { INTEREST_TYPE_CONFIG, INVESTMENT_TYPE_CONFIG, TAX_CONFIG } from "../../constants";


export default function EditFinancialProduct({product, onEdit, onCancel}){
        const [taxSettings, setTaxSettings] = useState(()=>{
            // 기존 상품의 taxType에 맞는 설정을 가져옴(없으면 STANDARD)
            const currentTaxConfig = TAX_CONFIG[product?.taxType] || TAX_CONFIG.STANDARD;
            return{
                ...currentTaxConfig,
                // rate는 DB에 저장된 실제 값을 사용
                rate: product?.taxRate !== undefined ? product.taxRate * 100 : currentTaxConfig.rate
            }
        });
        const onChangeTaxType = (e) => {
            const selectedTaxType = e.target.value;
            if(TAX_CONFIG[selectedTaxType]){
                setTaxSettings(TAX_CONFIG[selectedTaxType]);
            }
        }

        const isCash = product?.investmentType === INVESTMENT_TYPE_CONFIG.CASH.name;
        const isDeposit = product?.investmentType === INVESTMENT_TYPE_CONFIG.DEPOSIT.name;
        const isSavings = product?.investmentType === INVESTMENT_TYPE_CONFIG.SAVINGS.name;

        // todo: 현금, 예금, 적금 상품별로 수정 폼 구현, 현재는 모든 일관된 입력 필드가 노출되고 있음
        return (
        <div className="card">
            <h1 className="pageTitle">상품 수정</h1>
            <form className="form" onSubmit={onEdit}>
                {/* 서버 전송용 고정 데이터 */}
                <input type="hidden" name="productId" value={product?.id} required/>
                <input type="hidden" name="userId" value={product?.userId} required/>
                <input type="hidden" name="createdAt" value={product?.createdAt} required/>
                <div className="formRow">
                    <label>상품 유형:</label>
                    <input type="text" value={INVESTMENT_TYPE_CONFIG[product.investmentType]?.title} readOnly/>
                    <input type="hidden" name="investmentType" value={product?.investmentType} readOnly/>
                </div>
                <div className="formRow">
                    <label>상품 이름:</label>
                    <input type="text" name="name" defaultValue={product?.name} required/>
                </div>
                <div className="formRow">
                    <label>{isSavings ? "월 납입 금액" : "금액"}</label>
                    <input type="number" name="amount" defaultValue={product?.amount} required/>
                </div>
                {/* 현금 상품일 경우 숨겨진 필드 처리 */}
                {isCash && (
                    <>
                        <input type="hidden" name="months" value="0"/>
                        <input type="hidden" name="interestRate" value="0"/>
                        <input type="hidden" name="interestType" value={INTEREST_TYPE_CONFIG.NONE.name}/>
                        <input type="hidden" name="taxType" value={TAX_CONFIG.NONE.name}/>
                        <input type="hidden" name="taxRate" value={TAX_CONFIG.NONE.rate}/>
                    </>
                )}

                {/* 예금 및 적금 공통 필드 */}
                {(isDeposit || isSavings) && (
                    <>
                        <div className="formRow">
                            <label>개월:</label>
                            <input type="number" name="months" defaultValue={product?.months} required/>
                        </div>
                        {/* 적금 상품인 경우에는 납입일을 표시함 */}
                        {isSavings && (
                            <div className="formRow">
                                <label>납입일:</label>
                                <input type="number" name="paymentDay" defaultValue={product?.paymentDay}/>
                            </div>
                        )}
                        <div className="formRow">
                            <label>이자율(%):</label>
                            <input type="number" step="0.01" name="interestRate" defaultValue={product?.interestRate * 100} required/>
                        </div>
                        <div className="formRow">
                            <label>이자유형:</label>
                            <select name="interestType" defaultValue={product?.interestType} required>
                                <option value={INTEREST_TYPE_CONFIG.SIMPLE.name}>{INTEREST_TYPE_CONFIG.SIMPLE.desc}</option>
                                <option value={INTEREST_TYPE_CONFIG.COMPOUND.name}>{INTEREST_TYPE_CONFIG.COMPOUND.desc}</option>
                                <option value={INTEREST_TYPE_CONFIG.NONE.name}>{INTEREST_TYPE_CONFIG.NONE.desc}</option>
                            </select>
                        </div>
                        <div className="formRow">
                            <label>세금유형:</label>
                            <select name="taxType" defaultValue={product?.taxType} onChange={onChangeTaxType} required>
                                <option value={TAX_CONFIG.STANDARD.name}>{TAX_CONFIG.STANDARD.title}</option>
                                <option value={TAX_CONFIG.NON_TAX.name}>{TAX_CONFIG.NON_TAX.title}</option>
                                <option value={TAX_CONFIG.TAX_BENEFIT.name}>{TAX_CONFIG.TAX_BENEFIT.title}</option>
                                <option value={TAX_CONFIG.NONE.name}>{TAX_CONFIG.NONE.title}</option>
                            </select>
                        </div>
                        <div className="formRow">
                            <label>세금율(%):</label>
                            <input type="number" 
                                    step="0.001" 
                                    name="taxRate"
                                    value={taxSettings.rate}
                                    readOnly={taxSettings.readOnly}
                                    onChange={(e)=>setTaxSettings({...taxSettings, rate: Number(e.target.value)})}
                                    required/>
                        </div>
                            
                    </>
                )}
                {/* 금융 상품 공통 필드 */}
                <div className="formRow">
                    <label>시작일자:</label>
                    <input type="date" name="startDate" defaultValue={product?.startDate} required/>
                </div>
                <div className="formRow">
                    <label>화폐 통화</label>
                    <select name="currencyCode" defaultValue={product?.productCurrency.code} required>
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