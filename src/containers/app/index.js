import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import uuid from 'uuid/v1'
import { updateShopData } from '../../modules/shop'

class App extends React.Component {
  constructor(props) {
    super(props)

    // create user id
    props.store.dispatch(
      updateShopData({
        uuid: uuid()
      })
    )
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <div>
            {this.props.routes.map((route, i) =>
              route.routes.map((childRoute, j) => (
                <route.layout key={childRoute.path} {...childRoute} />
              ))
            )}
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
