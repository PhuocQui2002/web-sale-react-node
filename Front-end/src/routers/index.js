import ProductDetailsPage from "../pages/productDetailsPage/ProductDetailsPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../pages/homePage/HomePage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import shoppingCart from "../pages/orderPage/OrderPage";

import TypeProcduct from "../pages/typeProduct/TypeProcduct";
import ProfilePage from "../pages/profilePage/ProfilePage";
import AdminPage from "../pages/adminPage/AdminPage";
import PaymentPage from "../pages/paymentPage/PaymentPage";
import OrderSuccess from "../pages/orderSuccess/OrderSuccess";
import MyOrderPage from "../pages/myOderPage/MyOderPage";
import DetailsOrderPage from "../pages/detailsOrderPage/DetailsOrderPage";



export const routers = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/shoppingCart",
    page: shoppingCart,
    isShowHeader: true,
  },
  {
    path: '/product/:type',
    page: TypeProcduct,
    isShowHeader: true,
  },
  {
    path: "/productdetails/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/register",
    page: Register,
    isShowHeader: false,
  },
  {
    path: "/login",
    page: Login,
    isShowHeader: false,
  },
  {
    path: "/profilePage",
    page: ProfilePage,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
    
  },
  {
    path: "/AdminPage",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/orderSuccess",
    page: OrderSuccess,
    isShowHeader: true,
  },
  {
    path: "/myOderPage",
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: "/getDetailsOrder/:id",
    page: DetailsOrderPage,
    isShowHeader: true,
  },
];
