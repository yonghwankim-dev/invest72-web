import { useEffect, useState } from "react";
import api from "../../api/axios";
import FinancialProductCalculationResult from "./FinancialProductCalculationResult";

export default function DetailedFinancialProduct({product}){
    const [calculationResult, setCalculationResult] = useState(null);
    const investmentType = {
        "CASH": "현금",
        "DEPOSIT": "예금",
        "SAVINGS": "적금"
    };

    const interestType = {
        "SIMPLE": "단리",
        "COMPOUND": "복리",
        "NONE": "없음"
    };

    const taxType = {
        "STANDARD": "표준과세",
        "NON_TAX": "비과세",
        "TAX_BENEFIT": "세금우대",
        "NONE": "없음"
    };

    // 수익 계산 API 호출
    useEffect(()=>{
        if(product && product.investmentType !== "CASH"){
            api.get(`/api/v1/products/${product.id}/calculate`)
            .then(response => {
                console.log("수익 계산 결과:", response.data);
                setCalculationResult(response.data);
            })
            .catch(error => {
                console.error("수익 계산 실패:", error);
            });
        }else if(product && product.investmentType === "CASH"){
            setCalculationResult(null); // 현금 상품은 수익 계산 결과 없음
        }
    }, [product]);

    // productType이 CASH이면 상품 유형, 상품 이름, 금액만 출력
    let content = null;
    if(!product){
        content = <p>상품 정보를 불러오는 중입니다...</p>;
    }else if (product.investmentType === "CASH") {
        content = (
            <div className="details">
                <p><span>상품 유형</span><strong>{investmentType[product.investmentType]}</strong></p>
                <p><span>상품 이름</span><strong>{product.name}</strong></p>
                <p><span>금액</span><strong>{product.amount.toLocaleString()} {product.productCurrency.unit}</strong></p>
                <p><span>화폐 통화</span><strong>{product.productCurrency.name}({product.productCurrency.unit})</strong></p>
            </div>
        );
    }else if(product.investmentType === "DEPOSIT" || product.investmentType === "SAVINGS"){
        // productType이 DEPOSIT 또는 SAVINGS이면 모든 필드 출력
        const amountTitle = product.investmentType === "DEPOSIT" ? "예금 금액" : "적금 월 납입 금액";
        content = (
            <div className="details">
                    <p><span>상품 유형</span><strong>{investmentType[product.investmentType]}</strong></p>
                    <p><span>상품 이름</span><strong>{product.name}</strong></p>
                    <p><span>{amountTitle}</span><strong>{product.amount.toLocaleString()} {product.productCurrency.unit}</strong></p>
                    <p><span>화폐 통화</span><strong>{product.productCurrency.name}({product.productCurrency.unit})</strong></p>
                    <p><span>개월</span><strong>{product.months}</strong></p>
                    {product.investmentType === "SAVINGS" && (
                        <p><span>납일일</span><strong>{product.paymentDay}일</strong></p>
                    )}
                    <p><span>연 이자율(%)</span><strong>{(product.interestRate * 100).toFixed(2)}</strong></p>
                    <p><span>이자유형</span><strong>{interestType[product.interestType]}</strong></p>
                    <p><span>세금유형</span><strong>{taxType[product.taxType]}</strong></p>
                    <p><span>세금율(%)</span><strong>{(product.taxRate * 100).toFixed(2)}</strong></p>
                    <p><span>시작일자</span><strong>{product.startDate}</strong></p>
                    <p><span>만기일자</span><strong>{product.expirationDate === "+999999999-12-31" ? "만기일 없음" : product.expirationDate}</strong></p>
                    <p><span>현재 잔액(원금)</span><strong>{product.balance.toLocaleString()} {product.productCurrency.unit}</strong></p>
                    <p><span>진행률</span><strong>{(product.progress * 100).toFixed(2)}%</strong></p>
                    <p><span>남은 일수</span><strong>D-{product.remainingDays}</strong></p>
            </div>
        );
    }

    return (
        <>
        <div className="card">
            <h1 className="pageTitle">금융 상품 상세 페이지</h1>
            {content}
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