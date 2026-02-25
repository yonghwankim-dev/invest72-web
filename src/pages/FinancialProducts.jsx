
export default function FinancialProducts({products, onClickProduct}){
    const rows = products.map(product=>{
        return <tr key={product.id}>
                <td>
                    <a href={`/products/${product.id}`} onClick={(e) => {
                        e.preventDefault();
                        onClickProduct(product.id);
                    }}>
                            {product.name}
                    </a>
                </td>
            </tr>
    })
    return(
        <div>
            <table>
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