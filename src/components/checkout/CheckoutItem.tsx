import { cartActions } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addItemHandler = () => dispatch(cartActions.addItemToCart(cartItem));

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(cartItem));
  };
  return (
    <tbody>
      <tr>
        <td className="py-4">
          <div className="flex items-center">
            <img
              className="mr-4 h-16 w-16 rounded-md"
              src={imageUrl}
              alt="Product image"
            />
            <span className="font-semibold">{name}</span>
          </div>
        </td>
        <td className="py-4">${price}</td>
        <td className="py-4">
          <div className="flex items-center">
            <button
              className="mr-2 rounded-md border px-4 py-2"
              onClick={removeItemHandler}
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="ml-2 rounded-md border px-4 py-2"
              onClick={addItemHandler}
            >
              +
            </button>
          </div>
        </td>
        <td className="py-4">{price * quantity}</td>
      </tr>
    </tbody>
  );
};

export default CheckoutItem;
