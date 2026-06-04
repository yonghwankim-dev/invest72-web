import { useNavigate, useParams } from "react-router-dom";
import EditFinancialProduct from "../components/financial_product/EditFinancialProduct";
import Spinner from "../components/Spinner";
import styles from "../Home.module.css"
import { useProducts } from "../hooks/useProducts";
import { useEffect } from "react";
import { parseFinancialProductForm } from "../utils/utils";


export default function FinancialProductEditPage(){
    const {id} = useParams();
    const {selectedProduct, isMutationLoading, isFetchLoading, updateProduct, fetchProductDetail} = useProducts();
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProductDetail(id);
    }, [id, fetchProductDetail]);

    const onEdit = async (event) => {
        event.preventDefault();
        const success = await updateProduct(id, parseFinancialProductForm(new FormData(event.target)));
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