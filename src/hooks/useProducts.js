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

    // 상품 목록 조회
    const fetchProducts = useCallback(async()=>{
        try{
        const response = await api.get("/api/v1/products");
        setProducts(response.data);
        }catch(error){
            console.error("Failed to fetch products:", error);
        }
    }, []);

    // 상품 상세 조회
    const fetchProductDetail = useCallback(async(productId)=>{
        try{
            const response = await api.get(`/api/v1/products/${productId}`);
            setSelectedProduct(response.data);
            setId(productId);
            setMode(MODES.DETAIL);
        }catch(error){
            console.error("Failed to fetch product details:", error);
            setMode(MODES.READ);
        }
    }, []);

    // 상품 생성
    const createProduct = useCallback(async (data)=>{
        try{
            await api.post("/api/v1/products", data);
            alert("상품이 성공적으로 생성되었습니다.");
            setMode(MODES.READ);
            fetchProducts();
        }catch(error){
            console.error("Failed to create product:", error);
            alert("상품 생성에 실패했습니다.");
        }
    },[fetchProducts]);

    // 상품 수정
    const updateProduct = useCallback(async (productId, data)=>{
        try{
            await api.put(`/api/v1/products/${productId}`, data);
            alert("상품이 성공적으로 수정되었습니다.");
            fetchProductDetail(productId); // 수정 후 상세 정보 갱신
        }catch(error){
            console.error("Failed to edit product:", error);
            alert("상품 수정에 실패했습니다.");
        }
    },[fetchProductDetail]);

    // 상품 삭제
    const deleteProduct = useCallback(async (productId)=>{
        if(!window.confirm("정말로 이 상품을 삭제하시겠습니까?")){
            return;
        }
        try{
            await api.delete(`/api/v1/products/${productId}`);
            alert("상품이 성공적으로 삭제되었습니다.");
            goToReadMode();
            fetchProducts(); // 목록 새로고침
        }catch(error){
            console.error("Failed to delete product:", error);
            alert("상품 삭제에 실패했습니다.");
        }
    },[fetchProducts]);

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
        goToReadMode
    };
}