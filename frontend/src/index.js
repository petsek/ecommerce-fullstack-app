import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productsReducer, { productsFetch } from './features/productsSlice';
import cartReducer, { getTotals } from './features/cartSlice';
import authReducer, { loadUser } from './features/authSlice';
import orderReducer from './features/orderSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

