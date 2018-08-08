import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Cart from '../../components/Cart'
import Shipping from '../../components/Shipping'
import {
  updateShopData,
  changeShippingAddress,
  finishCheckout
} from '../../modules/shop'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.updateShopData({
      checkoutComplete: false
    })
  }

  render() {
    if (this.props.checkoutComplete) {
      return (
        <div>
          <h1>Checkout</h1>
          <p>Thanks you for shopping with us!</p>
          <Link to="/">Back to home</Link>
        </div>
      )
    }

    return (
      <div>
        <h1>Checkout</h1>
        <Cart cart={this.props.cart} />
        {this.props.checkoutFlow === 'one_step_checkout' ? (
          <Shipping
            shippingAddress={this.props.shippingAddress}
            changeShippingAddress={this.props.changeShippingAddress}
          />
        ) : (
          <p>Ship to: {this.props.shippingAddress}</p>
        )}
        <button onClick={this.props.finishCheckout}>Finish checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.shop.cart,
  checkoutFlow: state.shop.checkoutFlow,
  shippingAddress: state.shop.shippingAddress,
  checkoutComplete: state.shop.checkoutComplete
})

const mapDispatchToProps = {
  updateShopData,
  finishCheckout,
  changeShippingAddress
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
