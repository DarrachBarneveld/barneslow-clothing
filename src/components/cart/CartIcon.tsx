import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";

import { cartActions } from "../../store/cartSlice";
import CartDropdown from "./CartDropdown";

const CartIcon = () => {
  const dispatch = useDispatch();
  const { isCartOpen, cartCount } = useSelector((state) => state.cart);

  const toggleIsCartOpen = () => dispatch(cartActions.setIsCartOpen());

  return (
    <button onClick={toggleIsCartOpen} className="relative">
      <FaCartShopping className="text-4xl text-sky-600" />
      {isCartOpen && <CartDropdown />}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform font-bold text-white">
        {cartCount}
      </div>
    </button>
  );
};

export default CartIcon;
