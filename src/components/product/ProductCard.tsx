import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { cartActions } from "../../store/cartSlice";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
};
interface ProductCardProps {
  product: Product;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl, rating } = product;

  const roundedRating = Math.round(rating);

  const dispatch = useDispatch();

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="w-full object-cover" src={imageUrl} alt={`${name}`} />
        <span className="absolute left-0 top-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </div>
      <div className="mt-4 px-5 pb-5">
        <div>
          <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
        </div>
        <div className="mb-5 mt-2 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${price}</span>
            <span className="text-sm text-slate-900 line-through">
              ${price * 1.5}
            </span>
          </p>
          <div className="ml-2 flex w-full items-center justify-between">
            <div className="flex">
              {[...Array(roundedRating)].map((_, index) => (
                <FaStar
                  key={roundedRating + index}
                  className="text-base text-yellow-300"
                />
              ))}
            </div>
            <span className="ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {rating}
            </span>
          </div>
        </div>
        <button
          onClick={() => dispatch(cartActions.addItemToCart(product))}
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

{
  /* <div classNameName="product-card-container">
<img src={imageUrl} alt={`${name}`} />
<div classNameName="footer">
  <span classNameName="name">{name}</span>
  <span classNameName="price">{price}</span>
</div>
<button onClick={() => dispatch(cartActions.addItemToCart(product))}>
  Add to Cart
</button>
</div> */
}
