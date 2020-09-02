import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter , Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
        </Layout>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
