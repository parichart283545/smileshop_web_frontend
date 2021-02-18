import React from 'react'
import ProductTable from '../components/ProductTable'

function Product(props) {
    return (
        <div>
            <ProductTable history={props.history}></ProductTable>
        </div>
    )
}

export default Product
