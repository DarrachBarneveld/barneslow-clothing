import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getFirestore, collection, query, getDocs } from "firebase/firestore";

export const db = getFirestore();

export const getCategoriesAndDocumentsAction = createAsyncThunk(
  "category/documents",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const collectionRef = collection(db, "categories");

      const q = query(collectionRef);

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

      console.log(data);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryDocuments: null,
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    // CHECK USER
    builder.addCase(
      getCategoriesAndDocumentsAction.pending,
      (state, action) => {
        state.loading = true;
      },
    );
    builder.addCase(
      getCategoriesAndDocumentsAction.fulfilled,
      (state, action) => {
        console.log(action.payload);
        state.categoryDocuments = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      getCategoriesAndDocumentsAction.rejected,
      (state, action) => {
        state.loading = false;
      },
    );
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;

// state.appError = undefined;
// state.serverError = undefined;

export function createCategoryMap(categories) {
  return categories.reduce((acc, category) => {
    const { title, items } = category;

    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
}
