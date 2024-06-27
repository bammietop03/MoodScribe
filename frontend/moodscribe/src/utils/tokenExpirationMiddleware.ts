import { Middleware } from '@reduxjs/toolkit';
import { signout } from '../redux/auth/features';
import { isTokenExpired } from './helpers';

const tokenExpirationMiddleware: Middleware = (store) => {
  let isDispatching = false;
  return (next) => (action) => {
    if (!isDispatching) {
      const token = localStorage.getItem('token');

      if (token && isTokenExpired(token)) {
        isDispatching = true;
        console.log('Token expired, dispatching signout');
        store.dispatch(signout());
        isDispatching = false;
        return;
      }
    }
    return next(action);
  };
};

export default tokenExpirationMiddleware;
