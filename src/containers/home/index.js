import React from 'react'
import { connect } from 'react-redux'
import Products from '../../components/Products'
import {
  fetchProductsData
} from '../../modules/products'

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchProductsData()
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Products products={this.props.products}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = {
  fetchProductsData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
