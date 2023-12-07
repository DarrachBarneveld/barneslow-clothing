import { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { RootCartState } from "../../store/cartSlice";
import { RootAuthState } from "../../store/authSlice";
import { Customer, OrderData } from "../../lib/types";
import { saveSuccessfullPaymentOrder } from "../../config/firebase/firebase.utils";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, cartItems } = useSelector(
    (state: RootCartState) => state.cart,
  );
  const { userAuth } = useSelector((state: RootAuthState) => state.auth);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
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

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return "There was an error retrieving the card element";
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: userAuth ? userAuth.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        const customer: Customer = {
          id: userAuth?.uid || uuidv4(),
          name: userAuth?.displayName || "Guest",
          email: userAuth?.email || "guest@gmail.com",
        };

        const orderData: OrderData = {
          customer,
          paymentIntent: paymentResult.paymentIntent as Stripe.PaymentIntent, //unsure about this
          items: cartItems,
        };
        await saveSuccessfullPaymentOrder(orderData);
        alert("PAYMENT SUCCESSFUL");
      }
    }
  };

  return (
    <div className="flex h-[300px] flex-col items-center justify-center">
      <form
        className="h-[100px] w-full max-w-[500px]"
        onSubmit={paymentHandler}
      >
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <button
          className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700"
          disabled={isProcessingPayment}
        >
          PAY NOW
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
