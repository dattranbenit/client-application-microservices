import React from 'react'
import {
  Redirect, Route, Switch
} from 'react-router-dom'
import { routes } from '../../routes'

const AppContent = () => {
  return (
    <Switch>
      {routes.map((route, idx) => {
        return (
          <Route
            key={idx}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => (
              <route.component {...props} />
            )} />
        )
      })}
      <Redirect from="/" to="/accounts" />
    </Switch>
  )
}

export default React.memo(AppContent)
