import { User } from "firebase/auth";
import Stripe from "stripe";

export type Product = {
  id: string;
  imageUrl: string;
  price: number;
  name: string;
};

export type ProductWithQuantity = Product & {
  quantity: number;
};

export type Category = {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type OrderData = {
  customer: Customer;
  items: ProductWithQuantity[];
  paymentIntent: Stripe.PaymentIntent;
};
