export type Product = {
  id: string;
  imageUrl: string;
  price: number;
  name: string;
};

export type ProductWithQuantity = Product & {
  quantity: number;
};
