import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

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
  const dispatch = useDispatch();

  const { cartItems, cartTotal, cartCount } = useSelector(
    (state) => state.cart,
  );

  console.log(cartItems, cartTotal, cartCount);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <button onClick={() => dispatch(cartActions.addItemToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
