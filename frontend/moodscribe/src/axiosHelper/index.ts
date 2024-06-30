export const baseUrlApi =
  import.meta.env.VITE_PUBLIC_API_ENV === 'live'
    ? import.meta.env.VITE_APP_URL
    : 'http://localhost:5000';
