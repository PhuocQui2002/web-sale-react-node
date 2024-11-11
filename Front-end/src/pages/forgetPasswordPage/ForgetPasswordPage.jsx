import React, { useEffect } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperForm,
  WrapperModal,
  WrapperTextLight,
} from "./style";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";

import { Form, Image, Input, Modal } from "antd";
import { useLocation, useNavigate } from "react-router";
import InputForm from "../../components/InputForm/InputForm";
import ButtonCpmponent from "../../components/buttonCpmponent/ButtonCpmponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/loadingComponent/loadingComponent";
import * as message from "../../components/messageComponent/messageComponent";
import { useDispatch } from "react-redux";
import * as UserService from "../../services/UserService";
import login from "../../assets/images/logo-login.png";
import ModalComponent from "../../components/modalComponent/ModalComponent";
import InputComponent from "../../components/inputComponent/InputComponent";
import Password from "antd/es/input/Password";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState("");

  const [stateUserDetails, setStateUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log("stateUserDetails", stateUserDetails);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  const [isModalOpenOtp, setIsModalOpenOtp] = useState(false);
  const [isModalOpenPass, setIsModalOpenPass] = useState(false);

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
  // console.log("data-forget", data);

  const mutationDeleteOtp = useMutationHooks();

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
    UserService.sendPassword({ email, otp });
    mutation.mutate({
      email,
      otp,
    });
    setStateUserDetails({
      email: email,
      password: "",
      confirmPassword: "",
    });
    setIsModalOpenOtp(true);
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
      setIsModalOpenOtp(false);
      setIsModalOpenPass(true);
      // navigate(`/createNewPassword`, { state: email });
    } else {
      message.error("OTP không đúng");
    }
  };
  const mutationUpdatePassWord = useMutationHooks((data) => {
    const { ...stateUserDetails } = data;
    // console.log("...stateUserDetails", data);
    const res = UserService.updatePassword(data);
    console.log("res-pass", res);
    return res;
  });
  const { isLoading: isLoadingUpdatePass, data: dataPAss } =
    mutationUpdatePassWord;
  const handleUpdatePassword = () => {
    // console.log("Update-handleUpdateInforUser", stateUserDetails);
    const { email, password } = stateUserDetails;
    if (email && password) {
      mutationUpdatePassWord.mutate(
        { ...stateUserDetails },
        {
          onSuccess: () => {
            message.success("Cập nhật mật khẩu thành công");
            setIsModalOpenPass(false);
          },
        }
      );
    }
  };
  const handleOk = () => {
    checkOTP();
  };
  const handleCancel = () => {
    setIsModalOpenOtp(false);
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
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancleUpdate = () => {
    setStateUserDetails({
      email: "",
      password: "",
      confirmPassword: "",
    });
    form.resetFields();
    setIsModalOpenPass(false);
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
          <p>Quên mật khẩu</p>
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
          open={isModalOpenOtp}
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
        <ModalComponent
          title="Cập nhật mật khẩu"
          open={isModalOpenPass}
          onCancel={handleCancleUpdate}
          onOk={handleUpdatePassword}
        >
          {/* <LoadingComponent isLoading={isLoading}> */}
          <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your  phone!" }]}
            >
              <Input.Password
                value={stateUserDetails.password}
                onChange={handleOnchangeDetails}
                name="password"
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="confirmPassword"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input confirmPassword!" },
              ]}
            >
              <Input.Password
                value={stateUserDetails.confirmPassword}
                onChange={handleOnchangeDetails}
                name="confirmPassword"
                placeholder="Enter your confirmPassword"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                
                type="password"
              />
            </Form.Item>
          </Form>
          {/* </LoadingComponent> */}
        </ModalComponent>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
