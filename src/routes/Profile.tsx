import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootAuthState } from "../store/authSlice";
import { fetchUserOrders } from "../config/firebase/firebase.utils";
import { DocumentData } from "firebase/firestore";
import Order from "../components/order/Order";

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
      {orders.map((order: any) => (
        <Order order={order} />
      ))}
    </div>
  );
};

export default Profile;
