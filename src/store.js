import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./redux/data_slice";
export const store = configureStore({
  reducer: {
    books_list: booksSlice,
  },
});
