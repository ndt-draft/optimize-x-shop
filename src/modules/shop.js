import { push } from 'connected-react-router'
import api from '../modules/api'

// Constants
export const UPDATE_SHOP_DATA = 'shop/UPDATE_SHOP_DATA'

// Actions
export const updateShopData = payload => ({
  type: UPDATE_SHOP_DATA,
  payload
})

// Thunks
export const fetchShopData = () => {
  return async (dispatch, getState) => {
    let state = getState()
    let opi = await api.getOptimizelyInstance()
    let sortExperimentAttributes = {
      device: 'Desktop'
    }

    let sortBy = opi.activate(
      'sorting_experiment',
      state.shop.uuid,
      sortExperimentAttributes
    )
    let checkoutFlow = opi.activate('checkout_flow_experiment', state.shop.uuid)

    switch (sortBy) {
      case 'sort_by_name':
        sortBy = 'name'
        break
      case 'sort_by_price':
        sortBy = 'price'
        break
      default:
        sortBy = ''
        break
    }

    let products = api.fetchProducts(sortBy)

    dispatch(
      updateShopData({
        products,
        checkoutFlow
      })
    )
  }
}

export const addToCart = item => {
  return async (dispatch, getState) => {
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

    let attributes = {
      device: 'Desktop',
      ad_source: 'localhost'
    }
    let opi = await api.getOptimizelyInstance()
    opi.track('add_to_cart', state.shop.uuid, attributes)
  }
}

export const changeCheckout = () => {
  return (dispatch, getState) => {
    let state = getState()
    let checkoutFlow = state.shop.checkoutFlow

    if (checkoutFlow === 'two_step_checkout') {
      dispatch(push('/shipping'))
    } else {
      dispatch(push('/checkout'))
    }
  }
}

export const changeShippingAddress = value => {
  return dispatch => {
    dispatch(
      updateShopData({
        shippingAddress: value
      })
    )
  }
}

export const finishCheckout = () => {
  return async (dispatch, getState) => {
    let state = getState()
    let cart = state.shop.cart

    // track checkout_complete event here
    let revenue = cart.reduce((acc, item) => acc + item.price * item.count, 0)

    let opi = await api.getOptimizelyInstance()
    let eventTags = {
      shippingAddress: state.shop.shippingAddress,
      revenue: revenue * 100
    }
    opi.track('checkout_complete', state.shop.uuid, null, eventTags)

    // empty cart
    dispatch(
      updateShopData({
        cart: [],
        shippingAddress: '',
        checkoutComplete: true
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
  uuid: '',
  checkoutFlow: 'one_step_checkout',
  products: [],
  cart: [],
  shippingAddress: '',
  checkoutComplete: false
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
