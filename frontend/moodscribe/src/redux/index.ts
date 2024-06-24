import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleErrors = (err: any) => {
  const response = err.response;
  switch (response?.status) {
    case 500:
      toast.error(response.data.message);
      break;

    case 400:
    case 401:
    case 404:
    case 403:
    case 422:
      if (response.data.errors) {
        if (Array.isArray(response.data.errors)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.data.errors.forEach((each: any) => {
            toast.error(each.message);
          });
        } else if (typeof response.data.errors === 'object') {
          if (response.data.errors.length > 0) {
            Object.keys(response.data.errors).forEach((field) => {
              const errors = response.data.errors[field];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              errors.forEach((errorMessage: any) => {
                toast.error(errorMessage);
              });
            });
          } else {
            toast.error(response.data.errors.message);
          }
        }
      } else if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.error(response.data.message);
      }
      break;

    default:
      toast.error(err.message);
      break;
  }
};
