import { useState } from "react";


/**
 * 상품 생성 폼 컴포넌트
 * 
 * 상품 유형 현금 선택하는 경우
 * - 상품 이름, 상품 유형, 금액만 입력하도록 폼 구성
 * 
 * 상품 유형 예금 또는 적금 선택하는 경우
 * - 상품 이름, 상품 유형, 금액, 개월, 이자율, 이자유형, 세금유형, 세금율, 시작일자 입력하도록 폼 구성
 * 
 * onCreate: 상품 생성 요청을 처리하는 함수 (폼 제출 시 호출)
 * onCancel: 상품 생성 취소를 처리하는 함수 (취소 버튼 클릭 시 호출)
 */
export default function CreateFinancialProduct({onCreate, onCancel}){
    const [formContent, setFormContent] = useState(null);
    const onChangeTaxType = (e) => {
        const taxRateInput = document.querySelector('input[name="taxRate"]');
        if(e.target.value === "STANDARD"){
            taxRateInput.value = 0.154;
            taxRateInput.readOnly = true;
        }
        else if(e.target.value === "NON_TAX"){
            taxRateInput.value = 0;
            taxRateInput.readOnly = true;
        }
        else if(e.target.value === "TAX_BENEFIT"){
            taxRateInput.value = 0.014;
            taxRateInput.readOnly = false;
        }
    }
    const cashForm = (
        <>
            <div className="formRow">
                <label>상품 이름</label>
                <input type="text" name="name" placeholder="현금"/>
            </div>
            <div className="formRow">
                <label>금액</label>
                <input type="number" name="amount" placeholder="0"/>
            </div>
            <input type="hidden" name="months" value="0"/>
            <input type="hidden" name="interestRate" value="0"/>
            <input type="hidden" name="interestType" value="NONE"/>
            <input type="hidden" name="taxType" value="NONE"/>
            <input type="hidden" name="taxRate" value="0"/>
            <input type="hidden" name="startDate" value={new Date().toISOString().split('T')[0]}/>
        </>
    )
    const depositForm = (
        <>
            <div className="formRow">
                <label>상품 이름</label>
                <input type="text" name="name" placeholder="정기예금"/>
            </div>
            <div className="formRow">
                <label>일시금</label>
                <input type="number" name="amount" placeholder="0"/>
            </div>
            <div className="formRow">
                <label>개월</label>
                <input type="number" name="months" placeholder="0"/>
            </div>
            <div className="formRow">
                <label>이자율(%)</label>
                <input type="number" step="0.01" name="interestRate" placeholder="5"/>
            </div>
            <div className="formRow">
                <label>이자유형</label>
                <select name="interestType" defaultValue="COMPOUND">
                    <option value="SIMPLE">단리</option>
                    <option value="COMPOUND">복리</option>
                </select>
            </div>
            <div className="formRow">
                <label>세금유형</label>
                <select name="taxType" defaultValue="STANDARD" onChange={onChangeTaxType}>
                    <option value="STANDARD">표준과세</option>
                    <option value="NON_TAX">비과세</option>
                    <option value="TAX_BENEFIT">세금우대</option>
                </select>
            </div>
            <div className="formRow">
                <label>세금율(%)</label>
                <input type="number" step="0.001" name="taxRate" placeholder="15.4" defaultValue="15.4" readOnly/>
            </div>
            <div className="formRow">
                <label>시작일자</label>
                <input type="date" name="startDate" defaultValue={new Date().toISOString().split('T')[0]}/>
            </div>
        </>
    );
    const savingsForm = (
        <>
            <div className="formRow">
                <label>상품 이름</label>
                <input type="text" name="name" placeholder="적금"/>
            </div>
            <div className="formRow">
                <label>월 적립 금액</label>
                <input type="number" name="amount" placeholder="0"/>
            </div>
            <div className="formRow">
                <label>개월</label>
                <input type="number" name="months" placeholder="0"/>
            </div>
            <div className="formRow">
                <label>이자율(%)</label>
                <input type="number" step="0.01" name="interestRate" placeholder="5"/>
            </div>
            <div className="formRow">
                <label>이자유형</label>
                <select name="interestType" defaultValue="COMPOUND">
                    <option value="SIMPLE">단리</option>
                    <option value="COMPOUND">복리</option>
                </select>
            </div>
            <div className="formRow">
                <label>세금유형</label>
                <select name="taxType" defaultValue="STANDARD" onChange={onChangeTaxType}>
                    <option value="STANDARD">표준과세</option>
                    <option value="NON_TAX">비과세</option>
                    <option value="TAX_BENEFIT">세금우대</option>
                </select>
            </div>
            <div className="formRow">
                <label>세금율(%)</label>
                <input type="number" step="0.001" name="taxRate" placeholder="15.4" defaultValue="15.4" readOnly/>
            </div>
            <div className="formRow">
                <label>시작일자</label>
                <input type="date" name="startDate" defaultValue={new Date().toISOString().split('T')[0]}/>
            </div>
        </>
    );
    const actionController = (
        <div className="actions">
            <button className="buttonPrimary" type="submit">생성</button>
            <button className="buttonSecondary" type="button" onClick={onCancel}>취소</button>
        </div>
    );

    const onChangeProductType = (e) => {
        const selectedType = e.target.value;
        if(selectedType === "NONE"){
            setFormContent(null);
            return;
        }

        let form = null;
        if(selectedType === "CASH"){
            form = cashForm;
        }  else if(selectedType === "DEPOSIT"){
            form = depositForm;
        }else if(selectedType === "SAVINGS"){
            form = savingsForm;
        }
        const formContent = (
            <>
                {form}
                {actionController}
            </>
        );
        setFormContent(formContent);
    }

    return (
        <div className="card">
            <h1 className="pageTitle">상품 생성</h1>
            <div className="formRow">
                <form className="form" onSubmit={onCreate}>
                    <label>상품 유형:</label>
                    <select className="productType" name="productType" onChange={onChangeProductType}>
                        <option value="NONE">상품 유형 선택</option>
                        <option value="CASH">현금</option>
                        <option value="DEPOSIT">예금</option>
                        <option value="SAVINGS">적금</option>
                    </select>
                    {formContent}
                </form>
            </div>
        </div>
    );
}
