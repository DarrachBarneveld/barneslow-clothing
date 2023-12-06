import { FunctionComponent, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocumentsAction } from "../store/categorySlice";
import Category from "../components/category/Category";

interface ShopProps {}

const Shop: FunctionComponent<ShopProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAndDocumentsAction());
  }, []);

  return (
    <Routes>
      <Route index element={<div className="grid grid-cols-4 gap-1" />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
