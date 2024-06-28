import { store } from '../../redux/store';
import { isTokenExpired } from '../../utils/helpers';

const getCurrentState = () => {
  return store.getState();
};

export const authHeader = () => {
  const currentState = getCurrentState();

  const token = currentState.signin.token as string;

  if (token && !isTokenExpired(token)) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
  } else {
    return {};
  }
};
