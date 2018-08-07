import React from 'react'

const Product = (props) => (
  <div>
    <h3>{props.name} - ${props.price}</h3>
    <button>Add to cart</button>
  </div>
)

export default Product
