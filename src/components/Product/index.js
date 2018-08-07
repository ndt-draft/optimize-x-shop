import React from 'react'

const Product = props => {
  const addToCart = () => {
    props.addToCart(props)
  }

  return (
    <div>
      <h3>
        {props.name} - ${props.price}
      </h3>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  )
}

export default Product
