import { axiosJWT } from "./UserService"

export const createOrder = async (data,access_token) => {
    const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
  