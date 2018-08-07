import React from 'react'
import { connect } from 'react-redux'
import Products from '../../components/Products'
import Cart from '../../components/Cart'
import { fetchShopData, addToCart } from '../../modules/shop'

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchShopData()
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <div className="products-wrapper">
          <Products
            products={this.props.products}
            addToCart={this.props.addToCart}
          />
        </div>
        <div className="cart-wrapper">
          <Cart cart={this.props.cart} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.shop.products,
  cart: state.shop.cart
})

const mapDispatchToProps = {
  fetchShopData,
  addToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
