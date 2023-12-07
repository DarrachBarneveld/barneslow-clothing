import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getFirestore,
  collection,
  query,
  getDocs,
  DocumentData,
} from "firebase/firestore";

export const db = getFirestore();

export const getCategoriesAndDocumentsAction = createAsyncThunk(
  "category/documents",
  async (_, { rejectWithValue }) => {
    try {
      const collectionRef = collection(db, "categories");

      const q = query(collectionRef);

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export interface RootCategoryState {
  category: CategoryState;
}

interface CategoryState {
  categoryDocuments: DocumentData[];
  loading: boolean;
}

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryDocuments: [] as DocumentData[],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    // CHECK USER
    builder.addCase(getCategoriesAndDocumentsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCategoriesAndDocumentsAction.fulfilled,
      (state, action) => {
        state.categoryDocuments = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(getCategoriesAndDocumentsAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;

export function createCategoryMap(categories: DocumentData[]) {
  return categories.reduce((acc, category) => {
    const { title, items } = category;

    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
}
