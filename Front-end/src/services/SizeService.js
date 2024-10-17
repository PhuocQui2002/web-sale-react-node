import axios from "axios";

export const axiosJWT = axios.create();

export const getAllSize = async () => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/size/getAllSize`
  );
  return res.data;
};
