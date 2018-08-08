import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Shipping from '../../components/Shipping'
import { changeShippingAddress } from '../../modules/shop'

class ShippingContainer extends React.Component {
  render() {
    return (
      <div>
        <Shipping
          shippingAddress={this.props.shippingAddress}
          changeShippingAddress={this.props.changeShippingAddress}
        />
        <button onClick={this.props.changeCheckout}>Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shippingAddress: state.shop.shippingAddress,
  checkoutFlow: state.shop.checkoutFlow
})

const mapDispatchToProps = {
  changeShippingAddress,
  changeCheckout: () => push('/checkout')
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingContainer)
