import { useNavigate, useParams } from "react-router-dom";
import EditFinancialProduct from "../components/financial_product/EditFinancialProduct";
import Spinner from "../components/Spinner";
import styles from "../Home.module.css"
import { useProducts } from "../hooks/useProducts";
import { useEffect } from "react";


export default function FinancialProductEditPage(){
    const {id} = useParams();
    const {selectedProduct, isMutationLoading, isFetchLoading, updateProduct, fetchProductDetail} = useProducts();
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProductDetail(id);
    }, [id, fetchProductDetail]);

    const onEdit = async (event) => {
        event.preventDefault();
        const success = updateProduct(id, parseFormData(new FormData(event.target)));
        if(success){
            navigate("/products");
        }
    }

    if(isFetchLoading){
        return <Spinner/>
    }

    return (
        <div className={styles.page}>
            {isMutationLoading && <Spinner/>}
            <div className={styles.content}>
                <EditFinancialProduct product={selectedProduct} onEdit={onEdit} onCancel={()=>navigate(`/products/${id}`)}/>
            </div>
        </div>
    );
}
const parseFormData = (formData)=>{
    const data = Object.fromEntries(formData.entries());
    // 숫자 필드 변환
    data.amount = parseFloat(data.amount);
    data.months = parseInt(data.months);
    data.interestRate = parseFloat(data.interestRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환
    data.taxRate = parseFloat(data.taxRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환
    return data;
};