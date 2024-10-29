import axios from "axios";
import { axiosJWT } from "./UserService";
import { updateCart } from "../redux/slides/orderSlide";
import { useDispatch } from "react-redux";
export const createCart = async (data) => {
  //console.log("data-Cart",data);
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/cart/createCart`,
    data
  );
  return res.data;
};

export const getCartByUserId = async (userId, dispatch) => {

  //console.log("data-Cart",data);
  const res = await axios
    .get(`${import.meta.env.VITE_API_URL}/cart/getCartByUserId/${userId}`)
    .then(function (response) {
      dispatch(updateCart(response?.data?.data[0].orderItems));
      console.log(response);
    });
};


export const deleteOrderItemCart = async (userID, orderItems, access_token) => {
  try {
    // console.log("userID, orderItems, access_token", userID, orderItems, access_token)
    const res = await axiosJWT.delete(
      `${import.meta.env.VITE_API_URL}/cart/deleteOrderItemCart/${userID}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
        data: { orderItems }, // Send orderItems in the request body
      }
    );
    return res.data;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error deleting order item:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};
