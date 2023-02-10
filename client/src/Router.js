import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProductList from './pages/ProductList/ProductList';
import MyPage from './pages/MyPage/MyPage';
import Cart from './pages/CART/App';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Header from './pages/Layout/Header';
import Footer from './pages/Layout/Footer';
import OrderPage from './pages/OrderPage/OrderPage';
const Router = () => {
  const ROUTES = {
    MAIN: '/',
    LOGIN: '/user/login',
    SIGNUP: '/user/signup',
    PRODUCTLIST: '/product',
    PRODUCTDETAIL: '/product/:productId',
    MYPAGE: '/user/:userid',
    CART: '/cart',
    ORDER: '/order',
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.MAIN} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.PRODUCTLIST} element={<ProductList />} />
        <Route path={ROUTES.PRODUCTDETAIL} element={<ProductDetail />} />
        <Route path={ROUTES.MYPAGE} element={<MyPage />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.ORDER} element={<OrderPage />} />
      </Routes>
      <Footer>Footer</Footer>
    </BrowserRouter>
  );
};

export default Router;
