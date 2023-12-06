import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

const CartDropdown = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <div>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <h2>Your cart is empty</h2>
        )}
      </div>
      <button className="text-black" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </button>
    </div>
  );
};

export default CartDropdown;
