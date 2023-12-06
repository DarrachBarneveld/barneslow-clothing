import { useSelector } from "react-redux";
import CheckoutItem from "../components/checkout/CheckoutItem";
import PaymentForm from "../components/checkout/PaymentForm";

const Checkout = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

  return (
    <div className="h-screen bg-gray-100 py-8 md:min-w-fit">
      <div className="mx-auto px-4">
        <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                {cartItems.map((cartItem) => (
                  <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </table>
            </div>
          </div>
          <div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Summary</h2>
              <div className="mb-2 flex justify-between gap-4">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="mb-2 flex justify-between gap-4">
                <span>Taxes</span>
                <span>$0.00</span>
              </div>
              <div className="mb-2 flex justify-between gap-4">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="mb-2 flex justify-between gap-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${cartTotal}</span>
              </div>
            </div>
          </div>
        </div>
        <PaymentForm />
      </div>
    </div>
  );
};

export default Checkout;

// {cartItems.map((cartItem) => (
//     <CheckoutItem key={cartItem.id} cartItem={cartItem} />
//   ))}
//   <span classNameName="total">Total: ${cartTotal}</span>
//   <PaymentForm />
