import { useEffect, useState } from "react";
import api from "../../api/axios";
import FinancialProductCalculationResult from "./FinancialProductCalculationResult";
import {INTEREST_TYPE_CONFIG, INVESTMENT_TYPE_CONFIG, TAX_CONFIG} from "../../constants";
import { formatPercent } from "../../utils/utils";

export default function DetailedFinancialProduct({product}){
    const [calculationResult, setCalculationResult] = useState(null);

    // 수익 계산 API 호출
    useEffect(()=>{
        if(product?.id && product.investmentType !== INVESTMENT_TYPE_CONFIG.CASH.name){
            api.get(`/api/v1/products/${product.id}/calculate`)
            .then(response => {
                setCalculationResult(response.data);
            })
            .catch(error => {
                console.error("수익 계산 실패:", error);
            });
        }else{
            setCalculationResult(null);
        }
    }, [product]);

    // productType이 CASH이면 상품 유형, 상품 이름, 금액만 출력
    if(!product){
        return <div className="card"><p>상품 정보를 불러오는 중입니다...</p></div>;
    }

    const isCash = product.investmentType === INVESTMENT_TYPE_CONFIG.CASH.name;
    const isSavings = product.investmentType === INVESTMENT_TYPE_CONFIG.SAVINGS.name;
    const currencyUnit = product.productCurrency?.unit || "";
    
    return (
        <>
        <div className="card">
            <h1 className="pageTitle">금융 상품 상세 페이지</h1>
            <div className="details">
                {/* 1. 공통 정보 영역 */}
                <p><span>상품 유형</span><strong>{INVESTMENT_TYPE_CONFIG[product.investmentType]?.title}</strong></p>
                <p><span>상품 이름</span><strong>{product.name}</strong></p>
                <p>
                    <span>{isSavings ? "적금 월 납입 금액" : "금액"}</span>
                    <strong>{product.amount?.toLocaleString()} {currencyUnit}</strong>
                </p>
                <p><span>화폐 통화</span><strong>{product.productCurrency?.name}({currencyUnit})</strong></p>

                {/* 2. 예금/적금 추가 정보 영역 */}
                {!isCash && (
                    <>
                        <p><span>개월</span><strong>{product.months}</strong></p>
                        {isSavings && (
                            <p><span>납일일</span><strong>{product.paymentDay}일</strong></p>
                        )}
                        <p><span>연 이자율(%)</span><strong>{formatPercent(product.interestRate)}</strong></p>
                        <p><span>이자유형</span><strong>{INTEREST_TYPE_CONFIG[product.interestType]?.desc}</strong></p>
                        <p><span>세금유형</span><strong>{TAX_CONFIG[product.taxType]?.title}</strong></p>
                        <p><span>세금율(%)</span><strong>{formatPercent(product.taxRate)}</strong></p>
                        <p><span>시작일자</span><strong>{product.startDate}</strong></p>
                        <p>
                            <span>만기일자</span>
                            <strong>{product.expirationDate === "+999999999-12-31" ? "만기일 없음" : product.expirationDate}</strong>
                        </p>
                        <p><span>현재 잔액(원금)</span><strong>{product.balance?.toLocaleString()} {currencyUnit}</strong></p>
                        <p><span>진행률</span><strong>{formatPercent(product.progress)}</strong></p>
                        <p><span>남은 일수</span><strong>{product.remainingDays <= 0 ? "만기" : `D-${product.remainingDays}`}</strong></p>
                    </>
                )}
            </div>
        </div>
        {calculationResult && (
            <div className="card">
                <h2 className="sectionTitle">수익 계산 결과</h2>
                <FinancialProductCalculationResult result={calculationResult} />
            </div>
        )}
        </>
    )
}