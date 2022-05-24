import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cardapio from './pages/Cardapio'
import HomePage from './pages/HomePage'

const Routes = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/cardapio" component={Cardapio} />
    </Switch>
  </BrowserRouter>
}

export default Routes
