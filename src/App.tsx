import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Home from "./routes/Home";

import "./App.css";
import { checkUserSessionAction } from "./store/authSlice";
import Navbar from "./components/navigation/Navbar";
import Shop from "./routes/Shop";
import Checkout from "./routes/Checkout";
import { AppDispatch } from "./store/store";
import Profile from "./routes/Profile";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkUserSessionAction());
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex min-h-screen min-w-[100vw] flex-col items-center justify-center bg-indigo-200 py-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
