import React from 'react'

const Cart = props => {
  const calculateCartTotal = () => {
    return props.cart.reduce((acc, item) => acc + item.price * item.count, 0)
  }

  return (
    <div>
      <h2>Cart - ${calculateCartTotal()}</h2>
      {props.cart.map(product => (
        <h4 key={product.id}>
          {product.name} x {product.count}
        </h4>
      ))}
      <button onClick={props.changeCheckout}>Checkout</button>
    </div>
  )
}

export default Cart
