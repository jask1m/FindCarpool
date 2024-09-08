import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === (401 || 403)) {
      //TODO: add login function here
      console.log("We should log this user out: token expired.")
    }
    return Promise.reject(error);
  }
)