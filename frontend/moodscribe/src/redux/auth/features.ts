import axios from 'axios';
import { AppThunk } from '../store';
import { baseUrlApi } from '../../axiosHelper';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SigninValues, SignupValues } from '../../utils/types';
import { handleErrors } from '..';
import { jwtDecode } from 'jwt-decode';

const base = axios.create({
  baseURL: baseUrlApi,
});

export interface UserRegistration {
  user: SignupValues | null;
  success: boolean;
  loading: boolean;
  error: string;
}

const initialSignupState: UserRegistration = {
  user: null,
  success: false,
  loading: false,
  error: '',
};

// Signup slice
const signupSlice = createSlice({
  name: 'registration',
  initialState: initialSignupState,
  reducers: {
    signupStart(state) {
      state.loading = true;
      state.success = false;
      state.error = '';
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

    clearSignupState: (state) => {
      state.error = '';
      state.success = false;
      state.loading = false;

      return state;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, clearSignupState } =
  signupSlice.actions;
export const signupReducer = signupSlice.reducer;

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
    } catch (error) {
      dispatch(signupFailure(handleErrors(error)));
    }
  };

export interface Signin {
  token: string | null;
  success: boolean;
  loading: boolean;
  error: string;
  expirationTime: number | null;
}

const initialSigninState: Signin = {
  token: null,
  success: false,
  loading: false,
  error: '',
  expirationTime: null,
};

// Signin slice
const signinSlice = createSlice({
  name: 'signin',
  initialState: initialSigninState,
  reducers: {
    signinStart(state) {
      state.loading = true;
      state.success = false;
      state.error = '';
      state.token = null;
      state.expirationTime = null;
    },
    signinSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = true;
      state.token = action.payload;

      const decoded: { exp: number } = jwtDecode(action.payload);
      state.expirationTime = decoded.exp;
      localStorage.setItem('token', state.token);
    },

    signinFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.token = null; 
      state.expirationTime = null;
    },

    clearSigninState(state) {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
    signout(state) {
      state.token = null;
      state.expirationTime = null;
      localStorage.setItem('token', '');
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  clearSigninState,
  signout,
} = signinSlice.actions;
export const signinReducer = signinSlice.reducer;

// Async action creator for signin
export const signin =
  (userData: SigninValues): AppThunk =>
  async (dispatch) => {
    dispatch(signinStart());
    try {
      const response = await base.post('/login', userData, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
      const token = response.data.token;
      dispatch(signinSuccess(token));
      localStorage.setItem('token', token);
    } catch (error) {
      dispatch(signinFailure(handleErrors(error)));
    }
  };
