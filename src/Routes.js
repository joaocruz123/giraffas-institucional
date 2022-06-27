import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cardapio from './pages/Cardapio'
import HomePage from './pages/HomePage'
import Promocoes from './pages/Promocoes';

const Routes = (props) => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} {...props} />
      <Route path="/cardapio" component={Cardapio} {...props} />
			<Route path="/promocoes" component={Promocoes} {...props} />
    </Switch>
  </BrowserRouter>
}

export default Routes
