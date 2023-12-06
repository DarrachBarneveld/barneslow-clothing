import { useContext } from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "../components/checkout/CheckoutItem";
import PaymentForm from "../components/checkout/PaymentForm";

const Checkout = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
      <PaymentForm />
    </div>
  );
};

export default Checkout;
