import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { FunctionComponent, MouseEvent } from "react";
import { ProductWithQuantity } from "../../lib/types";

export interface CartItemProps {
  cartItem: ProductWithQuantity;
}

const CartItem: FunctionComponent<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();

  const removeItemHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(cartActions.removeItemFromCart(cartItem));
  };
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p className="ml-4">${price}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              type="button"
              onClick={removeItemHandler}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
