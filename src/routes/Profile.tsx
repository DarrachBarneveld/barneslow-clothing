import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootAuthState } from "../store/authSlice";
import { fetchUserOrders } from "../config/firebase/firebase.utils";
import { DocumentData } from "firebase/firestore";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { userAuth } = useSelector((state: RootAuthState) => state.auth);
  const [orders, setOrders] = useState<DocumentData>([]);

  useEffect(() => {
    async function fetchUserOrderDocs(id: string) {
      const data = (await fetchUserOrders(id)) as DocumentData;

      setOrders(data);
    }

    if (!userAuth) return;
    fetchUserOrderDocs(userAuth?.uid);
  }, [userAuth]);

  console.log(orders);
  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">{userAuth?.displayName}'s Orders</h1>
      {orders.map((order: any) =>
        order.items.map((item: any) => {
          const { imageUrl, name, price, quantity } = item;

          const date = new Date(order.paymentIntent.created * 1000);
          return (
            <div className="container mt-4 flex w-fit items-start justify-start gap-1 rounded-md border border-green-400 bg-slate-50">
              <div className="w-28">
                <img
                  className=" aspect-square h-full"
                  src={imageUrl}
                  alt="dress"
                />
              </div>
              <div className="flex h-full items-start justify-between p-1">
                <div className="flex w-full flex-col items-start justify-start ">
                  <h3 className="text-xl font-semibold leading-6 text-gray-800 dark:text-white xl:text-2xl">
                    {name}
                  </h3>
                  <div className="flex flex-col items-start justify-start space-y-2">
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
                    <p className="text-sm leading-none text-gray-800 dark:text-white">
                      <span className="text-gray-600 dark:text-gray-400">
                        Status:{" "}
                      </span>{" "}
                      Processing
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-start justify-between">
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
                  <div>
                    <p className="font-bold">Total Price</p>
                    <p className="text-base font-semibold leading-6 text-gray-800 dark:text-white xl:text-lg">
                      ${price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
};

export default Profile;
