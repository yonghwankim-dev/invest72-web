import FinancialProducts from "./FinancialProducts";
import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateFinancialProduct from "./CreateFinancialProduct";

export default function Home(){
  const [mode, setMode] = useState("READ");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    if (mode === "READ") {
      api.get("/api/v1/products").then(response => {
        setProducts(response.data);
      }).catch(error => {
        console.error("Failed to fetch products:", error);
      });
    }
  }, [mode]); // mode가 변경될 때마다 실행되는 useEffect

  let content = null;
  let contextController = null;
  if (mode === "READ") {
    content = <FinancialProducts products={products}/>;
    contextController = <nav>
      <button onClick={() => setMode("READ")}>목록 보기</button>
      <button onClick={() => setMode("CREATE")}>상품 등록</button>
    </nav>
  }else if (mode === "CREATE") {
    content = <CreateFinancialProduct handleCreate={(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      // 숫자 필드 변환
      data.amount = parseFloat(data.amount);
      data.months = parseInt(data.months);
      data.interestRate = parseFloat(data.interestRate);
      data.taxRate = parseFloat(data.taxRate);

      api.post("/api/v1/products", data)
        .then(response => {
          alert("상품이 성공적으로 생성되었습니다.");
          setMode("READ"); // 상품 생성 후 목록 보기로 전환
        })
        .catch(error => {
          console.error("Failed to create product:", error);
          alert("상품 생성에 실패했습니다.");
        });
    }}/>;
  }
  return (
    <div>
      {content}
      {contextController}
    </div>
  )
}