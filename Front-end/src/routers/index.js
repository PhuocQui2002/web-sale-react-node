import ProductDetailsPage from "../pages/productDetailsPage/ProductDetailsPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../pages/homePage/HomePage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import shoppingCart from "../pages/orderPage/OrderPage";
import ProductPage from "../pages/productPages/ProductPage";
import TypeProcduct from "../pages/typeProduct/TypeProcduct";
import ProfilePage from "../pages/profilePage/ProfilePage";
import AdminPage from "../pages/adminPage/AdminPage";



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
    path: "/product",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "/type",
    page: TypeProcduct,
    isShowHeader: true,
  },
  {
    path: "/productdetails",
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
];
