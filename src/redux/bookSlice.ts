import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import booksData from '../data/bookData';
import type Book from '../types/Book'; // Correctly import Book as a type

interface State {
  books: Book[];
  favourites: Book[];
}

const initialState: State = {
  books: booksData,
  favourites: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Book>) => {
      state.favourites.push(action.payload);
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter((book: Book) => book._id !== Number(action.payload));
    },
  },
});

export const { addToFavourites, removeFromFavourites } = bookSlice.actions;
export default bookSlice.reducer;
