import FinancialProducts from "../components/financial_product/FinancialProducts";
import { useEffect } from "react";
import EditFinancialProduct from "../components/financial_product/EditFinancialProduct";
import DetailedFinancialProduct from "../components/financial_product/DetailedFinancialProduct";
import styles from "../Home.module.css";
import { useProducts, MODES } from "../hooks/useProducts";
import CreateFinancialProduct from "../components/financial_product/CreateFinancialProduct";

const parseFormData = (formData)=>{
      const data = Object.fromEntries(formData.entries());
      // 숫자 필드 변환
      data.amount = parseFloat(data.amount);
      data.months = parseInt(data.months);
      data.interestRate = parseFloat(data.interestRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환
      data.taxRate = parseFloat(data.taxRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환
      return data;
};

export default function FinancialProduct(){
  const {
    mode, setMode, products, selectedProduct, id, setId,
    fetchProducts, fetchProductDetail, createProduct, updateProduct, deleteProduct, goToReadMode
  } = useProducts();
  
  useEffect(()=>{
    if(mode === MODES.READ){
      fetchProducts();
    }else if(mode === MODES.DETAIL && id){
      fetchProductDetail(id);
    }
  }, [mode, id, fetchProducts, fetchProductDetail]);

  let content = null;
  let contextController = null;

  switch(mode){
    case MODES.READ:
      const onClickProduct = (productId) => {
        setId(productId);
        setMode(MODES.DETAIL);
      };
      content = <FinancialProducts products={products} onClickProduct={onClickProduct} />;
      contextController = <nav>
        <button onClick={() => setMode(MODES.CREATE)}>상품 등록</button>
      </nav>
      break;
    case MODES.DETAIL:
      // DETAIL 모드에 대한 처리 (예: 상품 상세 보기)
      content = <DetailedFinancialProduct product={selectedProduct}/>;
      contextController = <nav>
        <button onClick={() => setMode(MODES.EDIT)}>상품 수정</button>
        <button onClick={() => deleteProduct(id)}>상품 삭제</button>
        <button onClick={() => goToReadMode()}>목록으로</button>
      </nav>
      break;
    case MODES.CREATE:
      const onCreate = (event) => {
        event.preventDefault();
        createProduct(parseFormData(new FormData(event.target)));
      }
      content = <CreateFinancialProduct onCreate={onCreate} onCancel={() => goToReadMode()}/>;
      break;
    case MODES.EDIT:
      // EDIT 모드에 대한 처리 (예: 상품 수정 폼)
      const onEdit = (event) => {
        event.preventDefault();
        const data = parseFormData(new FormData(event.target));
        updateProduct(id, data);
      }
      content = <EditFinancialProduct product={selectedProduct} onEdit={onEdit} onCancel={() => setMode(MODES.DETAIL)}/>;    
      break;
    default:
      content = <div>로딩 중...</div>;
  };

  return (
    <div className={`${styles.page} ${mode === MODES.READ ? styles.pageWide : ""}`}>
      <div className={styles.content}>{content}</div>
      <div className={styles.controllerArea}>
        {contextController}
      </div>
    </div>
  )
}