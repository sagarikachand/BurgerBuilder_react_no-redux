import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout'

import './App.css';
import BurgerBuilder from '../containers/burgerBuilder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom'
import Orders from '../containers/Orders/Orders';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders"   component={Orders} />
          <Route path="/" exact  component={BurgerBuilder} />
          
           
          </Switch>

        </Layout>
      </div>
    );
  }
}

export default App;
