import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCategoryMap } from "../../store/categorySlice";
import ProductCard, { Product } from "../product/ProductCard";

interface CategoryProps {}

const Category: FunctionComponent<CategoryProps> = () => {
  const { category } = useParams();

  const categories = useSelector((state) => state.category);

  const { categoryDocuments, loading } = categories;

  const [products, setProducts] = useState();

  useEffect(() => {
    if (!categoryDocuments) return;
    const categoryMap = createCategoryMap(categoryDocuments);
    setProducts(categoryMap[category]);
  }, [category, categoryDocuments]);

  return (
    <>
      <h2 className="my-3 text-3xl font-extrabold underline">
        {category.toUpperCase()}
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
