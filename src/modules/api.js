import data from './data'

export default {
  // Write your api functions here
  fetchProducts(sortBy) {
    return data.getItems(sortBy)
  },
  fetchProduct(productId) {
    return data.getItem(productId)
  }
}
