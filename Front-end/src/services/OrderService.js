import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_API_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/order/getAllOrder/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsOrder = async (id, access_token) => {
  const res = await axiosJWT.get(
   `${import.meta.env.VITE_API_URL}/order/getDetailsOrder/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};