import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
//   getCurrentUser,
// } from "../src/utils/firebase/firebase.utils";

import Nav from "./routes/home/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
// import { setCurrentUser } from "./store/user/user.action";
import { checkUserSession } from "./store/user/user.action";

// const Shop = () => {
//   return <h1>Shop Now</h1>;
// };

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

    // getCurrentUser().then((user) => console.log(user));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
