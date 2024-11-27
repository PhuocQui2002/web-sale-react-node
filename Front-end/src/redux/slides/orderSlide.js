import { createSlice } from "@reduxjs/toolkit";
import * as CartService from "../../services/CartService";
const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  shippingAddress: {},
  paymentMethod: "",
  shippingMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
  isSucessOrder: false,
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      console.log("state?.orderItems", state?.orderItems);

      const existingOrder = state?.orderItems?.find(
        (item) =>
          item?.product === orderItem.product &&
          item?.size === orderItem.size &&
          item?.frame === orderItem.frame
      );
      console.log("itemOrder", existingOrder);
      if (existingOrder) {
        existingOrder.amount += orderItem.amount;
      } else {
        state.orderItems.push({ ...orderItem });
      }
    },

    removeOrderProduct: (state, action) => {
      const orderItem = action.payload;

      const existingOrder = state?.orderItems?.filter(
        (item) =>
          !(
            item?.product === orderItem.idProduct &&
            item?.size === orderItem.size &&
            item?.frame === orderItem.frame
          )
      );
      const itemOrderSeleted = state?.orderItemsSlected?.filter(
        (item) =>
          !(
            item?.product === orderItem.idProduct &&
            item?.size === orderItem.size &&
            item?.frame === orderItem.frame
          )
      );

      state.orderItems = existingOrder;
      state.orderItemsSlected = itemOrderSeleted;
    },
    resetOrder: (state) => {
      state.isSucessOrder = false;
    },

    increaseAmount: (state, action) => {
      const orderItem = action.payload;
      // console.log("Order item:", orderItem);
      // console.log("State order items:", state.orderItems);
      const existingOrder = state?.orderItems?.find(
        (item) =>
          item?.product === orderItem.idProduct &&
          item?.size === orderItem.size &&
          item?.frame === orderItem.frame
      );
      const itemOrderSelected = state?.orderItemsSlected?.find(
        (item) =>
          item?.product === orderItem.idProduct &&
          item?.size === orderItem.size &&
          item?.frame === orderItem.frame
      );
      existingOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const orderItem = action.payload;
      // console.log("Order item:", orderItem);
      // console.log("State order items:", state.orderItems);
      const existingOrder = state?.orderItems?.find(
        (item) =>
          item?.product === orderItem.idProduct &&
          item?.size === orderItem.size &&
          item?.frame === orderItem.frame
      );
      const itemOrderSelected = state?.orderItemsSlected?.find(
        (item) =>
          item?.product === orderItem.idProduct &&
          item?.size === orderItem.size &&
          item?.frame === orderItem.frame
      );
      existingOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },

    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      console.log("listChecked2", listChecked);

      const itemOrders = state?.orderItems?.filter(
        (item) =>
          !listChecked.includes(`${item.product}${item.size}${item.frame}`)
      );

      const itemOrdersSelected = state?.orderItemsSlected?.filter(
        (item) =>
          !listChecked.includes(`${item.product}${item.size}${item.frame}`)
      );

      state.orderItems = itemOrders;
      state.orderItemsSlected = itemOrdersSelected;
    },

    selectedOrder: (state, action) => {
      console.log("checked-selectedOrder", state, action);
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product + order.size + order.frame)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSlected = orderSelected;
    },
    buyNowProduct: (state, action) => {
      const orderItem = action.payload;
      const orderSelected = [];
      orderSelected.push(orderItem);
      state.orderItemsSlected = orderSelected;
      console.log("buy-now-selectedOrder", state.orderItemsSlected);
    },
    updateCart: (state, action) => {
      const orderItem = action.payload;

      state.orderItems = orderItem;
    },
    clearCart: (state, action) => {
      state.orderItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  resetOrder,
  buyNowProduct,
  updateCart,
  clearCart,
} = orderSlide.actions;

export default orderSlide.reducer;
