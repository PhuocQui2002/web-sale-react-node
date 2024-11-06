// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import {
  AppstoreAddOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Modal, Form, Space } from "antd";
import TableComponent from "../tableComponent/table";
import InputComponent from "../inputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/messageComponent/messageComponent";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../drawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../modalComponent/ModalComponent";

const AdminUserComponent = () => {
  const user = useSelector((state) => state?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  
  

  const [rowSelected, setRowSelected] = useState("");
  
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    address: "",
    avatar: "",
  });

  const [stateEditUser, setStateEditUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    address: "",
    avatar: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      address: "",
      avatar: "",
    });
    form.resetFields();
  };

  const onUpdateUser = () => {
    //console.log("onUpdateUser");
    mutationUpdate.mutate(
      {
        id: rowSelected,
        ...stateEditUser,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryUser.refetch();
          
        },
        // onSuccess: () => {
        //   // Gọi lại hàm fetchGetDetailsUser sau khi update thành công
        //   fetchGetDetailsUser(rowSelected, user?.access_token);
        // },
      }
      
    );

  };

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeEdit = (e) => {
    setStateEditUser({
      ...stateEditUser,
      [e.target.name]: e.target.value,
    });
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    //console.log("data", data);
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    //console.log("id, token", id, token);
    const res = UserService.deleteUser(id, token);
    return res;
  });
  // const token = user?.access_token
  const fetchGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    if (res?.data) {
      setStateEditUser({
        name: res?.data?.name,
        phone: res?.data?.phone,
        email: res?.data?.email,
        address: res?.data?.address,
        avatar: res?.data?.avatar,
      });
    }
    //setIsLoadingUpdate(false);
  };
  //console.log("StateEditUser", stateEditUser);

  useEffect(() => {
    form.setFieldsValue(stateEditUser);
  }, [form, stateEditUser]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected, user?.access_token);
    }
  }, [rowSelected, user?.access_token]);
  ////////////////////////////////
  const handleEditUser = () => {
    //console.log("rowSelected", rowSelected);
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected, user?.access_token);
    }
    setIsOpenDrawer(true);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
        onError: (error) => {
          console.error(
            "Delete user error:",
            error.response?.data || error.message
          );
        },
      }
    );
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  /////////////////////////////////////////////////////////

  // eslint-disable-next-line no-unused-vars
  //const { data, isPending, isError, isSuccess } = mutation;
  const {
    data: dataUpdated,
    //isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  //console.log("dataUpdated", dataUpdated);

  const {
    data: dataDeleted,
    //isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "30px", color: "red", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
          onClick={handleEditUser}
        />
      </div>
    );
  };

  ////////////////////////////////////////////////////////////////
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // eslint-disable-next-line no-unused-vars
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await UserService.getAllUser(user?.access_token);
      //console.log("res-useradmin", res);
      return res;
    },
  });
  const { isPending: isPendingUser, data: users } = queryUser;

  //console.log("data-User", users);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isAdmin === true;
        }
        return record.isAdmin === false;
      },
    },

    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.rating - b.rating,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    users?.data?.length > 0 &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "true" : "false",
      };
    });
  ////////////////////////////////
  // useEffect(() => {
  //   if (isSuccess && data?.status === "OK") {
  //     message.success();
  //     handleCancel();
  //   } else if (isError) {
  //     message.error();
  //   }
  // }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật sản phẩm thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected]);

  ////////////////////////////////
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarEdit = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateEditUser({
      ...stateEditUser,
      avatar : file.preview,
    });
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateEditUser({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      address: "",
      avatar: "",
    });
    form.resetFields();
  };
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={showModal}
        >
          <UserAddOutlined
            style={{
              fontSize: "100px",
            }}
          />
        </Button>
      </div>
      {/* <WrapperUploadFile>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <UserAddOutlined
            style={{
              fontSize: "100px",
            }}
          />
        </Button>
      </WrapperUploadFile> */}
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          data={dataTable}
          // eslint-disable-next-line no-unused-vars
          onRow={(record, rowIndex) => {
            return {
              // eslint-disable-next-line no-unused-vars
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      <Modal
        forceRender
        footer={null}
        title="Thêm người dùng"
        open={isModalOpen}
        //onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên người dùng",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateUser.name}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                message: "Nhập eamil người dùng",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateUser.email}
              name="email"
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Nhập số điện thoại người dùng",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateUser.phone}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ nhà"
            name="address"
            rules={[
              {
                required: true,
                message: "Loại sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateUser.address}
              name="address"
            />
          </Form.Item>

          {/* <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Hình ảnh người dùng",
              },
            ]}
          >
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {stateUser?.image && (
              <img
                src={stateUser?.image}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
          </Form.Item> */}
          <Form.Item
            style={{
              textAlign: "right",
            }}
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <DrawerComponent
        title={<span style={{ color: "#ADD8E6" }}>Chi tiết người dùng</span>}
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="83%"
        style={{
          borderTopLeftRadius: "15px",
          backgroundColor: "#3d3d3d",
          color: "#FFD514",
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onUpdateUser}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: "#FFC107" }}>Tên người dùng</span>}
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên người dùng",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditUser.name}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#FF69B4" }}>Email người dùng</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "Email người dùng",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditUser.email}
              name="email"
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Số điện thoại",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditUser.phone}
              name="phone"
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ nhà"
            name="address"
            rules={[
              {
                required: true,
                message: "Địa chỉ nhà",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditUser.address}
              name="address"
            />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Hình ảnh Avatar",
              },
            ]}
          >
            <WrapperUploadFile onChange={handleOnchangeAvatarEdit} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {stateEditUser?.avatar && (
              <img
                src={stateEditUser?.avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
          </Form.Item>

          <Form.Item
            style={{
              textAlign: "right",
            }}
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={onUpdateUser}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>

      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onOk={handleDeleteUser}
        onCancel={handleCancelDelete}
      >
        <div>Bạn có muốn xóa tài khoản này không</div>
      </ModalComponent>
    </div>
  );
};

export default AdminUserComponent;
