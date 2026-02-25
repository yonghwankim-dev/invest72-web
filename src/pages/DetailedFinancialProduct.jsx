import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function DetailedFinancialProduct(){
    const [product, setProduct] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    useEffect(()=>{
        api.get(`/api/v1/products/${id}`)
            .then(response=>{
                setProduct(response.data);
                console.log("금융 상품 상세 조회 성공", response.data);
            })
            .catch(error=>{
                console.error("금융 상품 상세 조회 실패", error);
            });
    }, [id]);

    function handleDelete(){
        if(window.confirm("정말로 이 상품을 삭제하시겠습니까?")){
            api.delete(`/api/v1/products/${id}`)
                .then(response=>{
                    alert("금융 상품이 삭제되었습니다.");
                    window.location.href = "/"; // 홈으로 이동
                })
                .catch(error=>{
                    console.error("금융 상품 삭제 실패", error);
                    alert("금융 상품 삭제에 실패했습니다.");
                });
        }
    }

    return (
        <div>
            <h1>금융 상품 상세 페이지</h1>
            {product && (
                <div>
                    <p>상품 이름: {product.name}</p>
                    <p>상품 유형: {product.productType}</p>
                    <p>금액: {product.amount}</p>
                    <p>개월: {product.months}</p>
                    <p>이자율: {product.interestRate}</p>
                    <p>이자유형: {product.interestType}</p>
                    <p>세금유형: {product.taxType}</p>
                    <p>세금율: {product.taxRate}</p>
                    <p>시작일자: {product.startDate}</p>
                </div>
            )}
            <div>
                <a href="/">홈으로</a>
                <button onClick={handleDelete}>상품 삭제</button>
            </div>
        </div>
    )
}
