
export default function FinancialProducts({products}){
    const rows = products.map(product=>{
        return <tr key={product.id}>
                <td>
                    <a href={`/products/detailed?id=${product.id}`}>{product.name}</a>
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