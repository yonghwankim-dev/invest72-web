import { useNavigate } from "react-router-dom";
import CreateFinancialProduct from "../components/financial_product/CreateFinancialProduct";
import Spinner from "../components/Spinner";
import styles from "../Home.module.css"
import { useProducts } from "../hooks/useProducts";
import { parseFinancialProductForm } from "../utils/utils";

export default function FinancialProductCreatePage(){
    const {createProduct, isMutationLoading} = useProducts();
    const navigate = useNavigate();

    const onCreate = async (event) => {
        event.preventDefault();
        
        const success = await createProduct(parseFinancialProductForm(new FormData(event.target)));
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
