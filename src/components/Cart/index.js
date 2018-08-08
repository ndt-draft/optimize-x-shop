import React from 'react'

const Cart = props => {
  const calculateCartTotal = () => {
    return props.cart.reduce((acc, item) => acc + item.price * item.count, 0)
  }

  return (
    <div>
      <h2>Cart - ${calculateCartTotal()}</h2>
      <ul>
        {props.cart.map(product => (
          <li key={product.id}>
            <h4>
              {product.name} x {product.count}
            </h4>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cart
