
import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch, Router
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./views/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/">
          <AppLayout />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  let token = localStorage.getItem("TOKEN")

  if (token)
    return <Route {...rest} children={children} />

  return <Redirect to="/login" />
}

export default App;
