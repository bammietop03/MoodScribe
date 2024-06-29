import axios from 'axios';
import { ArticleValues } from '../../utils/types';
import { baseUrlApi } from '../../axiosHelper';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { handleErrors } from '..';

const base = axios.create({
  baseURL: baseUrlApi,
});

// Get Journals
export interface ArticlesState {
  articles: ArticleValues[];
  success: boolean;
  loading: boolean;
  error: string;
}

const ArticlesInitialState: ArticlesState = {
  articles: [],
  success: false,
  loading: false,
  error: '',
};

// Get Articles slice
const articlesSlice = createSlice({
  name: 'articles',
  initialState: ArticlesInitialState,
  reducers: {
    articlesStart(state) {
      state.loading = true;
      return state;
    },
    articlesSuccess(state, action: PayloadAction<ArticleValues[]>) {
      state.loading = false;
      state.success = true;
      state.articles = action.payload;
    },
    articlesFailure(state, action) {
      state.error = action.payload;
      return state;
    },

    clearArticlesState: (state) => {
      state.error = '';
      state.success = false;
      state.loading = false;

      return state;
    },
  },
});

export const {
  articlesStart,
  articlesSuccess,
  articlesFailure,
  clearArticlesState,
} = articlesSlice.actions;
export const articlessReducer = articlesSlice.reducer;

export const getArticles = (): AppThunk => async (dispatch) => {
  dispatch(articlesStart());
  try {
    const response = await base.get('/articles');
    dispatch(articlesSuccess(response.data));
  } catch (error) {
    dispatch(articlesFailure(handleErrors(error)));
  }
};
