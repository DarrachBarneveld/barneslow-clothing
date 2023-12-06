import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Home from "./routes/Home";

import "./App.css";
import { checkUserSessionAction } from "./store/authSlice";
import Navbar from "./components/navigation/Navbar";
import Shop from "./routes/Shop";
import Checkout from "./routes/Checkout";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUserSessionAction());
  }, []);

  return (
    <main className="flex min-h-screen min-w-[100vw] flex-col items-center justify-center bg-sky-300">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </main>
  );
}

export default App;
