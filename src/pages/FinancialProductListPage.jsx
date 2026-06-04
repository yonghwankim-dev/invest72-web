import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import styles from "../Home.module.css";
import DashboardProduct from "../components/financial_product/DashboardProduct";
import FinancialProducts from "../components/financial_product/FinancialProducts";

export default function FinancialProductListPage(){
    const {products, statistics, fetchProducts, fetchProductStatistics, isFetchLoading} = useProducts();
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProducts();
        fetchProductStatistics();
    }, [fetchProducts, fetchProductStatistics]);

    if(isFetchLoading){
        return <Spinner/>
    }

    return(
        <div className={`${styles.page} ${styles.pageWide}`}>
            <div className={styles.content}>
                <DashboardProduct statistics={statistics} />
                {/* 상품 클릭 시 해당 상품의 고유 ID 페이지 경로로 이동시킵니다. */}
                <FinancialProducts products={products} />
            </div>
            <div className={styles.controllerArea}>
                <nav><button onClick={() => navigate("/products/new")}>상품 등록</button></nav>
            </div>
        </div>
    )
}