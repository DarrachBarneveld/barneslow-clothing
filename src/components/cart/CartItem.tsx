const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div>
      <img src={imageUrl} alt={`${name}`} />
      <div>
        <span>
          {name} x {quantity}
        </span>
        <span>€{price}</span>
      </div>
    </div>
  );
};

export default CartItem;
