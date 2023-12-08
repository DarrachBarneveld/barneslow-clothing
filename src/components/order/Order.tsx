import { FunctionComponent } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { Link } from "react-router-dom";

interface OrderProps {
  order: any;
}

const Order: FunctionComponent<OrderProps> = ({ order }) => {
  const dispatch = useDispatch();
  return (
    <>
      {order.items.map((item: any) => {
        const { imageUrl, name, price, quantity, category } = item;

        const date = new Date(order.paymentIntent.created * 1000);
        return (
          <div className="container mt-4 w-fit rounded-lg border border-green-400 bg-slate-50 p-1">
            <div className="flex items-start justify-start gap-1">
              <div className="overflow-hidden rounded-lg">
                <img
                  className="aspect-square h-full max-h-40 object-cover"
                  src={imageUrl}
                  alt="dress"
                />
              </div>
              <div className="flex h-full items-start justify-between p-1">
                <div className="flex w-full flex-col items-start justify-center gap-4">
                  <h3 className="text-xl font-semibold leading-6 text-gray-800 dark:text-white xl:text-2xl">
                    {name}
                  </h3>
                  <div className="flex flex-col items-start justify-start space-y-4">
                    <p className="text-sm leading-none text-gray-800 dark:text-white">
                      <span className="text-gray-600 dark:text-gray-400">
                        Quantity:
                      </span>
                      {quantity}
                    </p>
                    <p className="text-sm leading-none text-gray-800 dark:text-white">
                      <span className="text-gray-600 dark:text-gray-400">
                        Order Date:
                      </span>
                      {date.toString()}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-start justify-between gap-4">
                  <div>
                    <p className="font-bold">Unit Price</p>
                    <p className="text-base leading-6 dark:text-white xl:text-lg">
                      ${price / quantity}{" "}
                      <span className="text-red-600 line-through">
                        {" "}
                        ${(price / quantity) * 1.5}
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="font-bold">Total Price</p>
                    <p className="text-base font-semibold leading-6 text-gray-800 dark:text-white xl:text-lg">
                      ${price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between p-1">
              <div>
                <IoIosCheckmarkCircle className="text-green-500" />
                <p className="text-sm leading-none text-gray-600 dark:text-white">
                  <span className="text-gray-600 dark:text-gray-400">
                    Status:{" "}
                  </span>{" "}
                  Processing
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  to={`/shop/${category}`}
                  className="flex items-center text-center font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Product
                </Link>
                <span className="h-full w-[1px] bg-slate-300"></span>
                <button
                  type="button"
                  onClick={() => dispatch(cartActions.addItemToCart(item))}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Order;
