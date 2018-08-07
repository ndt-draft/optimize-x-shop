import api from '../modules/api'

// Constants
export const UPDATE_PRODUCTS_DATA = 'products/UPDATE_PRODUCTS_DATA'

// Actions
export const updateProductsData = payload => ({
  type: UPDATE_PRODUCTS_DATA,
  payload
})

// Thunks
export const fetchProductsData = () => {
  return dispatch => {
    let products = api.fetchProducts()

    dispatch(
      updateProductsData({
        products
      })
    )
  }
}

// Action handlers
const ACTION_HANDLERS = {
  [UPDATE_PRODUCTS_DATA]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}

// Reducer
const initialState = {
  products: []
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
