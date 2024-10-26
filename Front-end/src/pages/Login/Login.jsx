// eslint-disable-next-line no-unused-vars
import React from "react";
import { Image } from "antd";
import { useState, useEffect } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonCpmponent from "../../components/buttonCpmponent/ButtonCpmponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import { updateUser } from "../../redux/slides/userSlide";

import imageLogo from "../../assets/images/logo1.jpg";
import mixilogo from "../../assets/images/mixilogo.jpg";
// import { FromContainer } from "./style";
// import logo from "../../assets/images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SignInPage() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleLogin = () => {
    mutation.mutate({
      email,
      password,
    });
    console.log("Login", email, password);
  };
  const handleForget = () => {
    navigate("/forgetPassword");
  };
  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  // eslint-disable-next-line no-unused-vars
  const { data, isPending, isSuccess } = mutation;

  useEffect(() => {
    
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }

      localStorage.setItem("access_token", JSON.stringify(data?.access_token));

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        console.log("decoded", decoded);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    // const storage = localStorage.getItem("refresh_token");
    // const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    console.log("res", res);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgbs(0,0,0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "30px",
          background: "#ccc",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <div style={{ display: "flex ", justifyContent: "center" }}>
            <Image
              src={mixilogo}
              preview={false}
              alt="logo-mixi"
              height="30px"
              width="60px"
              style={{
                height: "30px",
                marginTop: "30px",
                width: "55px",
              }}
            />
            <h1>MIXISHOP</h1>
          </div>

          <InputForm
            placeholder="Email@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
            style={{ marginBottom: "10px", border: "1px solid #ccc" }}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              style={{ marginBottom: "10px", border: "1px solid #ccc" }}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>

          {/* <Link to="/"></Link> */}
          {data?.status === "ERR" && (
            <span style={{ color: "red", marginBottom: "5px" }}>
              {data?.message}
            </span>
          )}

          <LoadingComponent isPending={mutation.isPending}>
            <ButtonCpmponent
              //bodered={false}
              onClick={handleLogin}
              disabled={!email.length || !password.length}
              size={40}
              styleButton={{
                background: "steelblue",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              textButton={"Đăng nhập"}
              styleStextButton={{
                color: "#fff",
                fontSize: "15px",
                fontweight: "700",
              }}
            />
          </LoadingComponent>

          <p>
            <WrapperTextLight onClick={handleForget}>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <Link
              style={{
                color: "rgb(13, 92, 182)",
                fontSize: "13px",
                cursor: "pointer",
              }}
              to="/register"
            >
              Register.
            </Link>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight
          style={{
            background: "steelblue",
          }}
        >
          <Image
            src={imageLogo}
            preview={false}
            alt="logo-login"
            height="220px"
            width="240px"
            style={{
              borderRadius: "50%",
              marginRight: "40px",
            }}
          />
        </WrapperContainerRight>
      </div>
    </div>
  );
}

export default SignInPage;

// <FromContainer>
//   <form action="" onSubmit={(event) => handleSubmit(event)}>
//     <div className="brand">
//       <img src={logo} alt="logo" />
//       <h1>snappy</h1>
//     </div>
//     <input
//       type="text"
//       placeholder="Username"
//       name="username"
//       //onChange={(e) => handleChange(e)}
//       min="3"
//     />
//     <input
//       type="password"
//       placeholder="Password"
//       name="password"
//       //onChange={(e) => handleChange(e)}
//     />
//     <button type="submit">Log In</button>
//     <span>
//       Already have an account ? <Link to="/register">Register.</Link>
//     </span>
//   </form>
// </FromContainer>
