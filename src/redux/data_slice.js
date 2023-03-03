import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book_data_list: [],
  booksType: "",
  loading: false,
};

export const booksSlice = createSlice({
  name: "books_list",
  initialState,
  reducers: {
    setBookList: (state, action) => {
      state.book_data_list = action.payload.payload;
      state.booksType = action.payload.type;
    },
    setBooksLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBookList, setBooksLoading } = booksSlice.actions;

export default booksSlice.reducer;
