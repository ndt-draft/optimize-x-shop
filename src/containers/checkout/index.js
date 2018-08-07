import React from 'react'
import { connect } from 'react-redux'
import { finishCheckout } from '../../modules/shop'

const Checkout = props => (
  <div>
    <h1>Checkout</h1>
    <button onClick={props.finishCheckout}>Finish checkout</button>
  </div>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  finishCheckout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
