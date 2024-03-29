import { createSlice } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "../lib/types";

const addCartItem = (
  cartItems: ProductWithQuantity[],
  productToAdd: ProductWithQuantity,
) => {
  // cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  // if found, up quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  // new product added
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: ProductWithQuantity[],
  cartItemToRemove: ProductWithQuantity,
) => {
  // find cart item to remove
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id;
  });

  // check if quantity is equal to 1, if true, remove from cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return cart items with reducted quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

export interface RootCartState {
  cart: CartState;
}

interface CartState {
  cartItems: ProductWithQuantity[];
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as ProductWithQuantity[],
    isCartOpen: false,
    cartCount: 0,
    cartTotal: 0,
  },
  reducers: {
    setIsCartOpen(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addItemToCart(state, action) {
      const newCart = addCartItem(state.cartItems, action.payload);
      const newCartTotal = state.cartTotal + action.payload.price;

      state.cartItems = newCart;
      state.cartCount++;
      state.cartTotal = newCartTotal;
    },
    removeItemFromCart(state, action) {
      const newCart = removeCartItem(state.cartItems, action.payload);
      const newCartTotal = state.cartTotal - action.payload.price;

      state.cartItems = newCart;
      state.cartCount--;
      state.cartTotal = newCartTotal;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
