import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_LOCAL_URL,
  withCredentials: true,
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
