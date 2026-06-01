import { useCallback, useState } from "react";
import api from "../api/axios";

export const MODES = {
    READ : "READ",
    CREATE : "CREATE",
    DETAIL : "DETAIL",
    EDIT : "EDIT"
}

export function useProducts(){
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [mode, setMode] = useState(MODES.READ);
    const [id, setId] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [isFetchLoading, setIsFetchLoading] = useState(true); // 목록/상세 조회용
    const [isMutationLoading, setIsMutationLoading] = useState(false); // 생성/수정/삭제 작업용

    // 상품 목록 조회
    const fetchProducts = useCallback(async()=>{
        setIsFetchLoading(true);
        try{
            const response = await api.get("/api/v1/products");
            setProducts(response.data);
        }catch(error){
            console.error("Failed to fetch products:", error);
        }finally{
            setIsFetchLoading(false);
        }
    }, [setIsFetchLoading]);

    // 상품 상세 조회
    const fetchProductDetail = useCallback(async(productId)=>{
        setIsFetchLoading(true);
        try{
            const response = await api.get(`/api/v1/products/${productId}`);
            setSelectedProduct(response.data);
            return true;
        }catch(error){
            console.error("Failed to fetch product details:", error);
        }finally{
            setIsFetchLoading(false);
        }
        return false;
    }, [setIsFetchLoading]);

    // 상품 생성
    const createProduct = useCallback(async (data)=>{
        setIsMutationLoading(true);
        try{
            await api.post("/api/v1/products", data);
            alert("상품이 성공적으로 생성되었습니다.");
            return true;
        }catch(error){
            console.error("Failed to create product:", error);
            alert("상품 생성에 실패했습니다.");
        }finally{
            setIsMutationLoading(false);
        }
        return false;
    },[setIsMutationLoading]);

    // 상품 수정
    const updateProduct = useCallback(async (productId, data)=>{
        setIsMutationLoading(true);
        try{
            await api.put(`/api/v1/products/${productId}`, data);
            alert("상품이 성공적으로 수정되었습니다.");
            return true;
        }catch(error){
            console.error("Failed to edit product:", error);
            alert("상품 수정에 실패했습니다.");
        }finally{
            setIsMutationLoading(false);
        }
        return false;
    },[setIsMutationLoading]);

    // 상품 삭제
    const deleteProduct = useCallback(async (productId)=>{
        if(!window.confirm("정말로 이 상품을 삭제하시겠습니까?")){
            return;
        }
        setIsMutationLoading(true);
        try{
            await api.delete(`/api/v1/products/${productId}`);
            alert("상품이 성공적으로 삭제되었습니다.");
            return true;
        }catch(error){
            console.error("Failed to delete product:", error);
            alert("상품 삭제에 실패했습니다.");
        }finally{
            setIsMutationLoading(false);
        }
        return false;
    },[setIsMutationLoading]);

    // 상품 통계 조회
    const fetchProductStatistics = useCallback(async ()=>{
        try{
            const response = await api.get("/api/v1/products/statistics");
            setStatistics(response.data);
            return true;
        }catch(error){
            console.error("Failed to fetch products statistics:", error);
            setStatistics({});
        }
        return false;
    }, []);

    const goToReadMode = ()=>{
        setId(null);
        setSelectedProduct(null);
        setMode(MODES.READ);
    }

    return {
        mode,
        setMode,
        products,
        selectedProduct,
        setSelectedProduct,
        id,
        setId,
        fetchProducts,
        fetchProductDetail,
        createProduct,
        updateProduct,
        deleteProduct,
        goToReadMode,
        statistics,
        fetchProductStatistics,
        isFetchLoading,
        isMutationLoading
    };
}