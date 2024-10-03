// eslint-disable-next-line no-unused-vars
import React from "react";
import {UserAddOutlined} from"@ant-design/icons"
import { WrapperHeader , WrapperUploadFile} from "./style";
import { Button } from "antd";
import TableComponent from "../tableComponent/table";

const AdminUserComponent = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <WrapperUploadFile>
        <Button style={{
          height: '150px',
          width: '150px',
          borderRadius: '6px',
          borderStyle: 'dashed',
        }}><UserAddOutlined style={{
          fontSize : '100px',
        }} /></Button>
      </WrapperUploadFile>
      <div style={{marginTop: "20px"}}><TableComponent/></div>
    </div>
  );
};

export default AdminUserComponent;
