import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";

import { RootCartState, cartActions } from "../../store/cartSlice";
import CartDropdown from "./CartDropdown";

const CartIcon = () => {
  const dispatch = useDispatch();
  const { isCartOpen, cartCount } = useSelector(
    (state: RootCartState) => state.cart,
  );

  const toggleIsCartOpen = () => dispatch(cartActions.setIsCartOpen());

  return (
    <button onClick={toggleIsCartOpen} className="relative">
      <FaCartShopping className="text-4xl text-stone-300" />
      {isCartOpen && <CartDropdown />}
      <div className="absolute left-1/2 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 transform font-extrabold text-amber-700">
        {cartCount}
      </div>
    </button>
  );
};

export default CartIcon;
