import axios from "axios";

export const axiosJWT = axios.create();

export const getFrame = async () => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/frame/getFrame`
  );
  return res.data;
};
