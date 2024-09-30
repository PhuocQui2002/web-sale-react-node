// import logo from "../../assets/images/logo.svg";
// import imageLogo from "../../assets/images/logo-login.png";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Image } from "antd";
import { useState, useEffect } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import {
  WrapperContainerLeft,
  WrapperContainerRight,
  //WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonCpmponent from "../../components/buttonCpmponent/ButtonCpmponent";
import imageLogo from "../../assets/images/logoDN.jpg";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/messageComponent/messageComponent";
//const [isShowPassword, setIsShowPassword] = useState(false);

function SignUpPage() {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleNavigateSignIn = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
    console.log("Register", email, password, confirmPassword);
  };

  const mutation = useMutationHooks((data) => UserService.registerUser(data));
  // eslint-disable-next-line no-unused-vars
  const { data, isPending, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgbs(0,0,0, 0.53)",
        height: "100vh",
        borderRadius: "20px",
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
          <h1>Tạo tài khoản</h1>

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
              value={password}
              onChange={handleOnchangePassword}
              type={isShowPassword ? "text" : "password"}
              //value={password}
              //onChange={handleOnchangePassword}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="comfirm password"
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
              type={isShowConfirmPassword ? "text" : "password"}
              //value={password}
              //onChange={handleOnchangePassword}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red", marginBottom: "5px" }}>
              {data?.message}
            </span>
          )}
          <ButtonCpmponent
            disabled={
              !email.length || !password.length || !confirmPassword.length
            }
            onClick={handleRegister}
            //bodered={false}
            size={40}
            styleButton={{
              //background: "#9255FD",
              background: "steelblue",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            textButton={"Đăng ký"}
            styleStextButton={{
              color: "#fff",
              fontSize: "15px",
              fontweight: "700",
            }}
          />

          <p>
            Đã có tài khoản?{" "}
            <Link
              style={{
                color: "rgb(13, 92, 182)",
                fontSize: "13px",
                cursor: "pointer",
              }}
              to="/Login"
            >
              Login.
            </Link>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight
          style={{
            backgroundColor: "steelblue",
          }}
        >
          <Image
            src={imageLogo}
            preview={false}
            alt="logo-login"
            height="203px"
            width="203px"
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

export default SignUpPage;

// <FormContainer>
//   <form
//     action=""
//     //onSubmit={(event) => handleSubmit(event)}
//   >
//     <div className="brand">
//       <img src={logo} alt="logo" />
//       <h1>MIXISHOP</h1>
//     </div>
//     <input
//       type="text"
//       placeholder="Username"
//       name="username"
//       //onChange={(e) => handleChange(e)}
//     />
//     <input
//       type="email"
//       placeholder="Email"
//       name="email"
//       //onChange={(e) => handleChange(e)}
//     />
//     <input
//       type="password"
//       placeholder="Password"
//       name="password"
//       //onChange={(e) => handleChange(e)}
//     />
//     <span
//       onClick={() => setIsShowPassword(!isShowPassword)}
//       style={{
//         zIndex: 10,
//         position: "absolute",
//         top: "4px",
//         right: "8px",
//       }}
//     >
//       {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
//     </span>

//     <input
//       type="password"
//       placeholder="Confirm Password"
//       name="confirmPassword"
//       //onChange={(e) => handleChange(e)}
//     />
//     <button type="submit">Create User</button>
//     <span>
//       Already have an account ? <Link to="/login">Login.</Link>
//     </span>
//   </form>
// </FormContainer>
