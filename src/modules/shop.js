import api from '../modules/api'

// Constants
export const UPDATE_SHOP_DATA = 'products/UPDATE_SHOP_DATA'

// Actions
export const updateShopData = payload => ({
  type: UPDATE_SHOP_DATA,
  payload
})

// Thunks
export const fetchShopData = () => {
  return dispatch => {
    let products = api.fetchProducts()

    dispatch(
      updateShopData({
        products
      })
    )
  }
}

export const addToCart = item => {
  return (dispatch, getState) => {
    let state = getState()
    let cart = [...state.shop.cart]

    let itemIndex = cart.findIndex(cartItem => cartItem.id === item.id)

    if (itemIndex >= 0) {
      cart[itemIndex].count += 1
    } else {
      cart = [
        ...cart,
        {
          ...item,
          count: 1
        }
      ]
    }

    dispatch(
      updateShopData({
        cart
      })
    )
  }
}

// Action handlers
const ACTION_HANDLERS = {
  [UPDATE_SHOP_DATA]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}

// Reducer
const initialState = {
  products: [],
  cart: []
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
