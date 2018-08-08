import React from 'react'

const Shipping = props => {
  const changeShippingAddress = e => {
    props.changeShippingAddress(e.target.value)
  }

  return (
    <div>
      <h2>Shipping</h2>
      <p>
        <input
          value={props.shippingAddress}
          onChange={changeShippingAddress}
          placeholder="Enter your address"
        />
      </p>
    </div>
  )
}

export default Shipping
