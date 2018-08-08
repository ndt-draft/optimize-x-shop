import DefaultLayout from './layouts/DefaultLayout'
import asyncComponent from './components/AsyncComponent'

const AsyncHome = asyncComponent(() => import('./containers/home'))
const AsyncCheckout = asyncComponent(() => import('./containers/checkout'))
const AsyncShipping = asyncComponent(() => import('./containers/shipping'))

export default [
  {
    layout: DefaultLayout,
    routes: [
      {
        path: '/',
        component: AsyncHome,
        exact: true
      },
      {
        path: '/checkout',
        component: AsyncCheckout,
        exact: true
      },
      {
        path: '/shipping',
        component: AsyncShipping,
        exact: true
      }
    ]
  }
]
