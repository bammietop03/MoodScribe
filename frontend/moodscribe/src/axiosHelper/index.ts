export const baseUrlApi =
  import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_URL
    : 'http://localhost:5000';
