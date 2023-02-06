import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NabBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import Checkout from './components/Checkout'
import NotFound from './components/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProductDetail from './components/ProductDetail';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NabBar />
        <Routes>
          <Route path='/:productId' element={<ProductDetail />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/order/create' element={<Checkout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
