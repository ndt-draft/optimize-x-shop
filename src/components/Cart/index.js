import React from 'react'

const Cart = props => (
  <div>
    <h2>Cart</h2>
    {props.cart.map(product => (
      <h4>
        {product.name} x {product.count}
      </h4>
    ))}
  </div>
)

export default Cart
