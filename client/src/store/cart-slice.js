import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        toast.success("Item quantity updated");
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
        toast.success("Item added to cart");
      }
    },
    removeFromCart(state, action) {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          toast.success("Item quantity updated");
        } else {
          state.cart = state.cart.filter((item) => item._id !== action.payload);
          toast.success("Item removed from cart");
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      toast.success("Cart cleared");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
