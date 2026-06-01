import Spinner from "../components/Spinner";
import { useProducts } from "../hooks/useProducts";
import styles from "../Home.module.css"
import DetailedFinancialProduct from "../components/financial_product/DetailedFinancialProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import OverlaySpinner from "../components/OverlaySpinner";

export default function FinancialProductDetailedPage({product}){
    const { id } = useParams();
    const { selectedProduct, fetchProductDetail, isFetchLoading, deleteProduct, isMutationLoading} = useProducts();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(id){
            fetchProductDetail(id);
        }
    },[id, fetchProductDetail]);

    if(isFetchLoading){
        return <Spinner/>
    }

    const handleDelete = async ()=>{
        const success = await deleteProduct(id);
        if(success){
            navigate("/products");
        }
    }

    return (
        <>
            <div className={`${styles.page} ${styles.pageWide}`}>
                {isMutationLoading && <OverlaySpinner/>}
                <div className={styles.content}>
                    <DetailedFinancialProduct product={selectedProduct}/>
                </div>
                <div className={styles.controllerArea}>
                    <nav>
                        <button onClick={() => navigate(`/products/${id}/edit`)}>상품 수정</button>
                        <button onClick={handleDelete}>상품 삭제</button>
                        <button onClick={() => navigate("/products")}>목록으로</button>
                    </nav>
                </div>
            </div>
        </>
    )
}