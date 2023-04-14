import axios from "axios";

export const catchError = (error) => {
  console.error(error);
}

export const useGetAxios = (url) => {
  return axios
    .get(url)
    .then((res) => res)
    .catch(catchError);
};