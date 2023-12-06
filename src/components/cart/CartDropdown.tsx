import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import { RootCartState } from "../../store/cartSlice";

const CartDropdown = () => {
  const { cartItems } = useSelector((state: RootCartState) => state.cart);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="absolute  right-0 top-10 z-10 rounded-md bg-slate-100 p-2">
      <div>
        {cartItems.length == 0 ? (
          <p className="text-sm text-slate-900">Your cart is empty!</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        )}
      </div>
      <button
        className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700"
        onClick={goToCheckoutHandler}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartDropdown;
