import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal } = useSelector((state) => state.cart);
  const { userAuth } = useSelector((state) => state.auth);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("./.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userAuth ? userAuth.displayName : "Guest",
        },
      },
    });

    console.log(paymentResult);
    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("PAYMENT SUCCESSFUL");
      }
    }
  };

  return (
    <div className="flex h-[300px] flex-col items-center justify-center">
      <form className="h-[100px] max-w-[500px]" onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <button className="ml-auto mt-[30px]" disabled={isProcessingPayment}>
          PAY NOW
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
