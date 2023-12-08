import { FunctionComponent } from "react";
import Directory from "../components/directory/Directory";
import { Outlet } from "react-router-dom";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase/firebase.utils";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const getRandomFloat = (min: number, max: number): number => {
    const randomFloat = Math.random() * (max - min) + min;
    return parseFloat(randomFloat.toFixed(2));
  };
  const updateDocuments = async () => {
    const collectionRef = collection(db, "categories");

    const snapshot = await getDocs(collectionRef);

    snapshot.forEach(async (doc) => {
      const { items } = doc.data();

      if (Array.isArray(items)) {
        const updatedItems = items.map((item) => ({
          ...item,
          category: doc.data().title.toLowerCase(),
          rating: getRandomFloat(0, 5),
        }));

        await updateDoc(doc.ref, {
          items: updatedItems,
        });

        console.log(`Fields added to 'items' for document with ID: ${doc.id}`);
      }
    });
  };

  return (
    <div className="w-full">
      <Directory />
      {/* <button onClick={updateDocuments}>update</button> */}
      <Outlet />
    </div>
  );
};

export default Home;
