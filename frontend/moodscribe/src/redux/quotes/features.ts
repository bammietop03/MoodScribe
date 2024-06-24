// src/features/quotes/quoteSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { quotes } from '../../utils/constants/quotes';
import { Quotes } from '../../utils/types';
// import axios from 'axios';

const initialState = {
  quotes,
};

const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    addQuote: (state, action: { payload: Quotes }) => {
      state.quotes.push(action.payload);
    },
  },
});

export const { addQuote } = quoteSlice.actions;

export default quoteSlice.reducer;
