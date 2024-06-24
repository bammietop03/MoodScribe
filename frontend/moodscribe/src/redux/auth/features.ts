import axios, { AxiosError } from 'axios';
import { AppThunk } from '../store';

import { baseUrlApi } from '../../axiosHelper';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SignupValues } from '../../utils/types';
import { handleErrors } from '..';

const base = axios.create({
  baseURL: baseUrlApi,
});

export interface UserRegistration {
  user: SignupValues | null;
  success: boolean;
  loading: boolean;
  error: AxiosError | null;
}

//define the initalstate for this utilslice
const initialState: UserRegistration = {
  user: null,
  success: false,
  loading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    signupStart(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<SignupValues>) {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    signupFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    clearState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;

      return state;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, clearState } =
  registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;

export const signup =
  (userData: SignupValues): AppThunk =>
  async (dispatch) => {
    dispatch(signupStart());
    try {
      const response = await base.post<SignupValues>('/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
      dispatch(signupSuccess(response.data));
      console.log('Data', response.data);
    } catch (error) {
      dispatch(signupFailure(handleErrors(error)));
    }
  };
