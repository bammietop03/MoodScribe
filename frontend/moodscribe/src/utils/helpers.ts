import { JwtPayload } from './types';
import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  const decoded: JwtPayload = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   console.log('Token has expired. Dispatching signout action.');
  // }
  return decoded.exp < currentTime;
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  };

  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
};
