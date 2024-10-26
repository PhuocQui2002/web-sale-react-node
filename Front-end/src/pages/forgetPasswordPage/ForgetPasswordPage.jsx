import React, { useEffect } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperForm,
  WrapperModal,
  WrapperTextLight,
} from "./style";
import { useState } from "react";

import { Image, Input, Modal } from "antd";
import { useLocation, useNavigate } from "react-router";
import InputForm from "../../components/InputForm/InputForm";
import ButtonCpmponent from "../../components/buttonCpmponent/ButtonCpmponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/loadingComponent/loadingComponent";
import * as message from "../../components/messageComponent/messageComponent";
import { useDispatch } from "react-redux";
import login from "../../assets/images/logo-login.png";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueInput1, setValueInput1] = useState("");
  const [valueInput2, setValueInput2] = useState("");
  const [valueInput3, setValueInput3] = useState("");
  const [valueInput4, setValueInput4] = useState("");
  const [valueInput5, setValueInput5] = useState("");
  const [valueInput6, setValueInput6] = useState("");

  const handleNavigateSignIn = () => {
    navigate("/login");
  };
  
  const mutation = useMutationHooks();
  //(data) => OtpService.createOtp(data)
  const { data, isLoading, isSuccess } = mutation;
  console.log("data-forget", data)

  const mutationDeleteOtp = useMutationHooks();
  //(data) => OtpService.deleteOtp(data)
  const onDeleteOtp = () => {
    mutationDeleteOtp.mutate({ otp: otpSent });
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleSendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("otp: " + otp);
    setOtpSent(otp);
    mutation.mutate({
      email,
      otp,
    });
    setIsModalOpen(true);
  };
  const checkOTP = () => {
    const data = [
      valueInput1,
      valueInput2,
      valueInput3,
      valueInput4,
      valueInput5,
      valueInput6,
    ];
    let value = data.join("");
    if (Number(value) === otpSent) {
      message.success();
      onDeleteOtp();
      setIsModalOpen(false);
      navigate(`/createNewPassword`, { state: email });
    } else {
      message.error("OTP không đúng");
    }
  };

  const handleOk = () => {
    checkOTP();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeInput1 = (e) => {
    setValueInput1(e.target.value);
  };
  const onChangeInput2 = (e) => {
    setValueInput2(e.target.value);
  };
  const onChangeInput3 = (e) => {
    setValueInput3(e.target.value);
  };
  const onChangeInput4 = (e) => {
    setValueInput4(e.target.value);
  };
  const onChangeInput5 = (e) => {
    setValueInput5(e.target.value);
  };
  const onChangeInput6 = (e) => {
    setValueInput6(e.target.value);
  };


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#efefef",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          background: "#fff",
          borderRadius: "20px",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h4
            style={{
              margin: "0px 0px 10px",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            Xin chào
          </h4>
          <p >Quên mật khẩu</p>
          <InputForm
            placeholder="Nhập email"
            style={{ marginBottom: "10px" }}
            value={email}
            onChange={handleOnchangeEmail}
          />

          {data?.status === "ERR" && (
            <span style={{ color: "red", fontSize: "13px", padding: "10px 0" }}>
              {data?.message}
            </span>
          )}
          {/* <Loading isLoading={isLoading}> */}

          <ButtonCpmponent
            disabled={!email.length}
            onClick={handleSendOtp}
            size={20}
            styleButton={{
              background: "rgb(255, 66, 78)",
              borderRadius: "4px",
              border: "none",
              height: "48px",
              width: "100%",
              fontSize: "15px",
              margin: "30px 0px 10px",
            }}
            textButton={"Gửi OTP"}
            styleStextButton={{ color: "#fff" }}
          ></ButtonCpmponent>
          {/* </Loading> */}
          <p>
            Đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={login}
            preview={false}
            alt="image logo"
            style={{ width: "250px", height: "250px" }}
          />
          <div style={{ margin: "30px 0px 0px", textAlign: "center" }}>
            <h4
              style={{
                margin: "0px 0px 5px",
                color: "rgb(255,255,255)",
                fontSize: " 17px",
                fontWeight: "500",
              }}
            >
              Mua sắm tại QUI ART
            </h4>
          </div>
        </WrapperContainerRight>

        <WrapperModal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <WrapperForm className="form">
            <div className="title">OTP</div>
            <div className="title">Mã xác minh</div>
            <p className="message">
              Chúng tôi đã gửi mã xác minh đến số điện thoại di động của bạn
            </p>
            <div className="inputs">
              <input
                id="input1"
                type="text"
                maxLength="1"
                onChange={onChangeInput1}
              />
              <input
                id="input2"
                type="text"
                maxLength="1"
                onChange={onChangeInput2}
              />
              <input
                id="input3"
                type="text"
                maxLength="1"
                onChange={onChangeInput3}
              />
              <input
                id="input4"
                type="text"
                maxLength="1"
                onChange={onChangeInput4}
              />
              <input
                id="input5"
                type="text"
                maxLength="1"
                onChange={onChangeInput5}
              />
              <input
                id="input6"
                type="text"
                maxLength="1"
                onChange={onChangeInput6}
              />
            </div>
          </WrapperForm>
        </WrapperModal>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
