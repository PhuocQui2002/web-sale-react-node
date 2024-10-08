//import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routers } from "./routers";
import DefaultComponent from "./components/defaulComponent/DefaultComponent";
//import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";

export function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // useEffect(() => {
  //   let storageData = localStorage.getItem("access_token");
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData);
  //     const decoded = jwtDecode(storageData);
  //     if (decoded?.id) {
  //       handleGetDetailsUser(decoded?.id, storageData);
  //     }
  //   }
  //   console.log("storageData", storageData);
  // }, []);
  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token);
  //   dispatch(updateUser({ ...res?.data, access_token: token }));
  // }
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    // console.log("storageData", storageData);
    // console.log("isJsonString(storageData)", isJsonString);
    // console.log("decoded", decoded);

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      console.log("decoded-test", decoded);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        console.log("data-test", data);
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    console.log("data-res", res);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Router>
        <Routes>
          {routers.map((router, index) => {
            const Page = router.page;
            const isCheckAuth = !router.isPrivate || user.isAdmin;
            const Layout = router.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  isCheckAuth && (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// useEffect(() => {
//   fetchApi();
// }, []);
// //eslint-disable-next-line no-undef
// const apiUrl = import.meta.env.VITE_API_URL;
// console.log("process.env.REACT_APP_API_URL", apiUrl);
// const fetchApi = async () => {
//   // const res = await axios.get(
//   //   `http://localhost:3001/api/product/getAllProduct`
//   // );
//   const res = await axios.get(
//     // eslint-disable-next-line no-undef
//     `${apiUrl}/product/getAllProduct`
//   );
//   console.log("res ", res);
// };
//const apiUrl = import.meta.env.VITE_API_URL;
// console.log("process.env.REACT_APP_API_URL", apiUrl);
// const fetchApi = async () => {
//   const res = await axios.get(
//     // eslint-disable-next-line no-undef
//     `${apiUrl}/product/getAllProduct`
//   );
//   return res.data;
// };
// const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
// console.log("query ", query);
