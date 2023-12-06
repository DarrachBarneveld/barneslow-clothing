import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};
interface ProductCardProps {
  product: Product;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  // const { addItemToCart } = useContext(CartContext);
  const dispatch = useDispatch();

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <button onClick={() => console.log("hello")}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
