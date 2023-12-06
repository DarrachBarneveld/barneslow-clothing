import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";

import { cartActions } from "../../store/cartSlice";
import CartDropdown from "./CartDropdown";

const CartIcon = () => {
  const dispatch = useDispatch();
  const { isCartOpen, cartCount } = useSelector((state) => state.cart);

  const toggleIsCartOpen = () => dispatch(cartActions.setIsCartOpen());

  return (
    <div onClick={toggleIsCartOpen}>
      <FaCartShopping className="text-2xl text-sky-600" />
      {isCartOpen && <CartDropdown />}
      <div>{cartCount}</div>
    </div>
  );
};

export default CartIcon;
