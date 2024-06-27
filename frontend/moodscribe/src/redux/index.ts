import { toast } from 'sonner';

const handleToast = (err: string) => {
  let toastId = null;

  if (!toastId) {
    toastId = toast.error(err);
  }

  return () => {
    if (toastId) {
      toast.dismiss(toastId);
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleErrors = (err: any) => {
  const response = err.response;
  switch (response?.status) {
    case 500:
      handleToast(response.data.error);
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
            handleToast(each.message);
          });
        } else if (typeof response.data.errors === 'object') {
          if (response.data.errors.length > 0) {
            Object.keys(response.data.errors).forEach((field) => {
              const errors = response.data.errors[field];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              errors.forEach((errorMessage: any) => {
                handleToast(errorMessage);
              });
            });
          } else {
            handleToast(response.data.errors.message);
          }
        }
      } else if (response.data.error) {
        handleToast(response.data.error);
      } else {
        handleToast(response.data.message);
      }
      break;

    default:
      toast.error(err.message);
      break;
  }
};
