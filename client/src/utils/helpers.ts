import axios from 'axios';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    return error.response?.data?.message || error.message || 'An error occurred';
  } else if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  } else if (typeof error === "string") {
    return error;
  } else {
    return "An unknown error occurred";
  }
}

export { getErrorMessage };