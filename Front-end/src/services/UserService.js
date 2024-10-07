import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/user/login`,
    data
  );
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/user/register`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/user/getDetails/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/user/refreshToken`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const logOutUser = async () => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/logOut`);
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${import.meta.env.VITE_API_URL}/user/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const deleteUser = async (
  id,
  access_token
  //data
) => {
  const res = await axiosJWT.delete(
    `${import.meta.env.VITE_API_URL}/user/delete/${id}`,
    // data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/user/getAllUser`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_API_URL}/user/deleteMany`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// export const refreshToken = async (refreshToken) => {
//     console.log('refreshToken', refreshToken)
//     const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/refresh-token`, {} , {
//         headers: {
//             token: `Bearer ${refreshToken}`,
//         }
//     })
//     return res.data
// }
