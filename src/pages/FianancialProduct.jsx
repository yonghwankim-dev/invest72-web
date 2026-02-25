import FinancialProducts from "../components/financial_product/FinancialProducts";
import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateFinancialProduct from "../components/financial_product/CreateFinancialProduct";
import EditFinancialProduct from "../components/financial_product/EditFinancialProduct";
import DetailedFinancialProduct from "../components/financial_product/DetailedFinancialProduct";
import styles from "../Home.module.css";

export default function FinancialProduct(){
  const [mode, setMode] = useState("READ");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState(null);
  
  useEffect(() => {
    if (mode === "READ") {
      api.get("/api/v1/products").then(response => {
        setProducts(response.data);
      }).catch(error => {
        console.error("Failed to fetch products:", error);
      });
    }else if(mode === "READ_DETAIL"){
      // 상품 상세 정보 가져오기 (예: /api/v1/products/{id})
      api.get(`/api/v1/products/${id}`).then(response => {
        setSelectedProduct(response.data);
      }).catch(error => {
        console.error("Failed to fetch product details:", error);
        setMode("READ");
      });
    }
  }, [mode, id]); // mode 또는 id가 변경될 때마다 실행되는 useEffect

  let content = null;
  let contextController = null;
  if (mode === "READ") {
    const onClickProduct = (id) => {
      setId(id);
      setMode("READ_DETAIL");
    };
    content = <FinancialProducts products={products} onClickProduct={onClickProduct} />;
    contextController = <nav>
      <button onClick={() => setMode("CREATE")}>상품 등록</button>
    </nav>
  }else if (mode === "CREATE") {
    const onCreate = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      // 숫자 필드 변환
      data.amount = parseFloat(data.amount);
      data.months = parseInt(data.months);
      data.interestRate = parseFloat(data.interestRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환
      data.taxRate = parseFloat(data.taxRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환

      api.post("/api/v1/products", data)
        .then(response => {
          alert("상품이 성공적으로 생성되었습니다.");
          setMode("READ"); // 상품 생성 후 목록 보기로 전환
        })
        .catch(error => {
          console.error("Failed to create product:", error);
          alert("상품 생성에 실패했습니다.");
        });
    }
    content = <CreateFinancialProduct onCreate={onCreate} onCancel={() => setMode("READ")}/>;
  }
  else if(mode === "READ_DETAIL"){
    // READ_DETAIL 모드에 대한 처리 (예: 상품 상세 보기)
    content = <DetailedFinancialProduct product={selectedProduct}/>;
    contextController = <nav>
      <button onClick={() => setMode("EDIT")}>상품 수정</button>
      <button onClick={() => {
        if (window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
          api.delete(`/api/v1/products/${id}`)
            .then(response => {
              alert("상품이 성공적으로 삭제되었습니다.");
              setMode("READ"); // 상품 삭제 후 목록 보기로 전환
            })
            .catch(error => {
              console.error("Failed to delete product:", error);
              alert("상품 삭제에 실패했습니다.");
              setMode("READ"); // 삭제 실패 시 목록 보기로 전환하여 상태 초기화
            });
          setId(null); // 삭제 후 선택된 상품 ID 초기화
          setSelectedProduct(null); // 삭제 후 선택된 상품 정보 초기화
        }
      }}>상품 삭제</button>
      <button onClick={() => setMode("READ")}>목록으로</button>
    </nav>
  }
  else if (mode === "EDIT") {
    // EDIT 모드에 대한 처리 (예: 상품 수정 폼)
    const onEdit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      // 숫자 필드 변환
      data.amount = parseFloat(data.amount);
      data.months = parseInt(data.months);
      data.interestRate = parseFloat(data.interestRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환
      data.taxRate = parseFloat(data.taxRate / 100); // 사용자 입력이 퍼센트이므로 100으로 나누어 소수로 변환

      api.put(`/api/v1/products/${data.id}`, data)
        .then(response => {
          alert("상품이 성공적으로 수정되었습니다.");
          setMode("READ_DETAIL"); // 상품 수정 후 상세 보기로 전환
        })
        .catch(error => {
          console.error("Failed to edit product:", error);
          alert("상품 수정에 실패했습니다.");
        });
    }
    content = <EditFinancialProduct product={selectedProduct} onEdit={onEdit} onCancel={() => setMode("READ_DETAIL")}/>;    
  }
  return (
    <div className={styles.page}>
      <div className={styles.content}>{content}</div>
      <div className={styles.controllerArea}>
        {contextController}
      </div>
    </div>
  )
}