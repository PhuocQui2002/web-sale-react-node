import axios from "axios";
import { axiosJWT } from "./UserService";

//http://localhost:3001/api/evaluate/create

export const createEvaLuate = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/evaluate/create`,
    data
  );
  return res.data;
};

export const getAllOrderByProductId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/evaluate/getAllOrderByProductId/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
