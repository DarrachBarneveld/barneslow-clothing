const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price } = cartItem;
  return (
    <div>
      <img src={imageUrl} alt={`${name}`} />
      <div>
        <span>{name}</span>
        <span>€{price}</span>
      </div>
    </div>
  );
};

export default CartItem;
