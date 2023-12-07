import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { OrderData } from "../../lib/types";

const firebaseConfig = {
  apiKey: "AIzaSyDFBPjZ93OyzmEvgQT38FazSj6v5SkR9Rk",
  authDomain: "barneslow-clothing.firebaseapp.com",
  projectId: "barneslow-clothing",
  storageBucket: "barneslow-clothing.appspot.com",
  messagingSenderId: "350479590601",
  appId: "1:350479590601:web:82cb645f1f7b4cec945918",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey: string,
  documentsToAdd: any[],
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  documentsToAdd.forEach((document) => {
    const docRef = doc(collectionRef, document.title.toLowerCase());
    batch.set(docRef, document);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const saveSuccessfullPaymentOrder = async (orderData: OrderData) => {
  try {
    const ordersCollection = collection(db, "orders");

    const newOrderRef = await addDoc(ordersCollection, orderData);

    console.log("Order added with ID: ", newOrderRef.id);

    return newOrderRef.id;
  } catch (error) {
    console.error("Error saving order:", error);
    throw error;
  }
};

export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;

    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(`error creating user`, err);
    }
  }

  return userSnapShot;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: any) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};
