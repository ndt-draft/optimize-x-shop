import React from 'react'
import Product from '../Product'

const Products = (props) => (
  <div>
    {props.products.map(product =>
      <Product key={product.id} {...product}/>
    )}
  </div>
)

export default Products
