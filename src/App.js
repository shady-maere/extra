import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import ScrollToTop from './components/ScrollToTop';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import VendorRegistration from './pages/VendorRegistration';
import VendorList from './pages/VendorList';
import VendorProductUpload from './pages/VendorProductUpload';
import Admin from './pages/Admin'; // Import Admin component
import CategoryProducts from './pages/CategoryProducts';
import BluetoothSpeakers from './pages/BluetoothSpeakers';
import ListProduct from './pages/ListProduct';
import Login from './pages/Login';
import Register from './pages/Register';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0; // Removed padding since we want to remove space
`;

function App() {
  useEffect(() => {
    // Product initialization is handled in store.js
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <GlobalStyles />
        <AppContainer>
          <Navbar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/category/:category" element={<CategoryProducts />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/vendor-registration" element={<VendorRegistration />} />
              <Route path="/vendors" element={<VendorList />} />
              <Route path="/vendor/product-upload" element={<VendorProductUpload />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/sell" element={<ListProduct />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </Provider>
  );
}

export default App;
