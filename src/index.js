import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";
// import { UserProvider } from "./contexts/user.context";
import { Provider } from "react-redux";
// import { CartProvider } from "./contexts/cart.context";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

import reportWebVitals from "./reportWebVitals";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate load={null} persistor={persistor}>
      <BrowserRouter>
        {/* <UserProvider> */}
        {/* <CartProvider> */}
        <App />
        {/* </CartProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
