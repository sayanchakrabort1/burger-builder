import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter , Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

import { Provider } from 'react-redux';
import { createStore ,  applyMiddleware , compose , combineReducers} from 'redux';
import reducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/orders';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
  burgerBuilder: reducer,
  order: orderReducer
});

const store = createStore(rootReducer , composeEnchancers(
  applyMiddleware(thunk)
));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Layout>
          
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
