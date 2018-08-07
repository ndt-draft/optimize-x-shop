import React from 'react'
import Product from '../Product'

const Products = props => (
  <div>
    <h2>Products</h2>
    {props.products.map(product => (
      <Product key={product.id} {...product} addToCart={props.addToCart} />
    ))}
  </div>
)

export default Products
