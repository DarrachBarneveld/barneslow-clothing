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
