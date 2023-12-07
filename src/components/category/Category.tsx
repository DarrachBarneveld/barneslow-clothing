import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  RootCategoryState,
  createCategoryMap,
} from "../../store/categorySlice";
import ProductCard, { Product } from "../product/ProductCard";

interface CategoryProps {}

const Category: FunctionComponent<CategoryProps> = () => {
  const { category } = useParams();
  const selectedCategory = category ?? "";

  const categories = useSelector((state: RootCategoryState) => state.category);

  const { categoryDocuments, loading } = categories;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryDocuments) return;
    const categoryMap = createCategoryMap(categoryDocuments);
    setProducts(categoryMap[selectedCategory]);
  }, [category, categoryDocuments]);

  return (
    <>
      <h2 className="my-3 text-3xl font-extrabold underline">
        {selectedCategory.toUpperCase()}
      </h2>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="grid grid-cols-4 gap-2 text-2xl">
          {products &&
            products.map((product: Product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
