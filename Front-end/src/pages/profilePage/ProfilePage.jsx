// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import {
  WrapperHeader,
  WrapperContentProfile,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import ButtonComponent from "../../components/buttonCpmponent/ButtonCpmponent";
import InputForm from "../../components/InputForm/InputForm";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slides/userSlide";
import * as message from "../../components/messageComponent/messageComponent";
import { getBase64 } from "../../utils";

import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    //console.log("res-update ", res);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div
      style={{
        width: "1270px",
        margin: "0 auto",
      }}
    >
      <WrapperHeader>ProfilePage</WrapperHeader>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Name</WrapperLabel>
          <InputForm
            style={{ width: "300px", border: "1px solid" }}
            id="name"
            value={name}
            onChange={handleOnchangeName}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleStextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <InputForm
            style={{ width: "300px", border: "1px solid" }}
            id="email"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleStextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
          <InputForm
            style={{ width: "300px", border: "1px solid" }}
            id="phone"
            value={phone}
            onChange={handleOnchangePhone}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleStextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Adress</WrapperLabel>
          <InputForm
            style={{ width: "300px", border: "1px solid" }}
            id="phone"
            value={address}
            onChange={handleOnchangeAddress}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleStextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Avatar</WrapperLabel>
          <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </WrapperUploadFile>
          {avatar && (
            <img
              key={avatar}
              src={avatar}
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt="avatar"
            />
          )}
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleStextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
      </WrapperContentProfile>
    </div>
  );
};

export default ProfilePage;
