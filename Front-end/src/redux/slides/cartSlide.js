import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderItems: [],
  userID: "",
};

export const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const { orderItem } = action.payload;
      console.log("state?.orderItems", state?.orderItems);

      state.orderItems.push({ ...orderItem });
      //state.userID = userID ;
    },
  },
});
export const {
    addCart,
  } = cartSlide.actions;