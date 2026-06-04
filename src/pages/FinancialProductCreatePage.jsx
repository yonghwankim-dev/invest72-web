import { useNavigate } from "react-router-dom";
import CreateFinancialProduct from "../components/financial_product/CreateFinancialProduct";
import Spinner from "../components/Spinner";
import styles from "../Home.module.css"
import { useProducts } from "../hooks/useProducts";

export default function FinancialProductCreatePage(){
    const {createProduct, isMutationLoading} = useProducts();
    const navigate = useNavigate();

    const onCreate = async (event) => {
        event.preventDefault();
        const success = await createProduct(parseFormData(new FormData(event.target)));
        if(success){
            navigate("/products");
        }
    }

    return (
        <div className={styles.page}>
            {isMutationLoading && <Spinner/>}
            <div className={styles.content}>
                <CreateFinancialProduct onCreate={onCreate} onCancel={() => navigate("/products")} />
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
