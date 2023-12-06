import { createSlice } from "@reduxjs/toolkit";

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find cart item to remove
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id;
  });

  console.log(existingCartItem);
  // check if quantity is equal to 1, if true, remove from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return cart items with reducted quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

// {
//   id: 19,
//   imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
//   name: "Blue Jean Jacket",
//   price: 90,
//   quantity: 1,
// },
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
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
      const itemToRemove = action.payload;
      console.log(action.payload);
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
