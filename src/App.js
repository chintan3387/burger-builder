import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} /> 
      </Layout>
    </div>
  );
}

export default App;
