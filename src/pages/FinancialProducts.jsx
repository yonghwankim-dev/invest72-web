
export default function FinancialProducts({products, onClickProduct}){
    const rows = products.map(product=>{
        return <tr key={product.id}>
                <td>
                    <a className="tableLink" href={`/products/${product.id}`} onClick={(e) => {
                        e.preventDefault();
                        onClickProduct(product.id);
                    }}>
                            {product.name}
                    </a>
                </td>
            </tr>
    })
    return(
        <div className="card">
            <h1 className="pageTitle">금융 상품 목록</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>상품명</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}