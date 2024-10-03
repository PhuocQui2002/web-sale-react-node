// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  AppstoreAddOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Modal, Form } from "antd";
import TableComponent from "../tableComponent/table";
import InputComponent from "../inputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/messageComponent/messageComponent";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../drawerComponent/DrawerComponent";
import { useSelector } from "react-redux";

const AdminProductComponent = () => {
  const user = useSelector((state) => state?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    discount: "",
  });

  const [stateEditProduct, setStateEditProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    discount: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
      discount: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateProduct);
    console.log("Success:", stateProduct);
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: user?.access_token,
      ...stateEditProduct,
    });
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeEdit = (e) => {
    setStateEditProduct({
      ...stateEditProduct,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock: countInStock,
      discount,
    } = data;
    console.log("data", data);

    const res = ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
      discount,
    });
    return res;
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateEditProduct({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
      });
    }
    //setIsLoadingUpdate(false);
  };
  console.log("StateEditProduct", stateEditProduct);

  useEffect(() => {
    form.setFieldsValue(stateEditProduct);
  }, [form, stateEditProduct]);
  useEffect(() => {
    if (rowSelected) {
      //setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  const handleEditProduct = () => {
    console.log("rowSelected", rowSelected);
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
    setIsOpenDrawer(true);
  };

  const { data, isPending, isError, isSuccess } = mutation;
  const {
    data: dataUpdated,
    //isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  console.log("dataUpdated", dataUpdated);
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "30px", color: "red", cursor: "pointer" }}
        />
        <EditOutlined
          style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
          onClick={handleEditProduct}
        />
      </div>
    );
  };
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await ProductService.getAllProduct();
      return res;
    },
    retry: 3,
    retryDelay: 1000,
  });
  console.log("data-product", products);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    // },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product, index) => ({
      ...product,
      key: `${product.id}-${index}`,
    }));

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      //handleCancel();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  console.log("mutation", mutation);

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarEdit = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateEditProduct({
      ...stateEditProduct,
      image: file.preview,
    });
  };
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
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
          <AppstoreAddOutlined
            style={{
              fontSize: "100px",
            }}
          />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      <Modal
        footer={null}
        title="Thêm sản phẩm"
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
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateProduct.name}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="type"
            rules={[
              {
                required: true,
                message: "Loại sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateProduct.type}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: "Giá sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateProduct.price}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Số lượng sản phẩm"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Loại sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateProduct.countInStock}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[
              {
                required: true,
                message: "Loại sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateProduct.rating}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả sản phẩm"
            name="description"
            rules={[
              {
                required: true,
                message: "Mô tả sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateProduct.description}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh sản phẩm"
            name="description"
            rules={[
              {
                required: true,
                message: "Hình ảnh sản phẩm",
              },
            ]}
          >
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {stateProduct?.image && (
              <img
                src={stateProduct?.image}
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <DrawerComponent
        title={<span style={{ color: "#ADD8E6" }}>Chi tiết sản phẩm</span>}
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
          onFinish={onUpdateProduct}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: "#FFC107" }}>Tên sản phẩm</span>}
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditProduct.name}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#FF69B4" }}>Loại sản phẩm</span>}
            name="type"
            rules={[
              {
                required: true,
                message: "Loại sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditProduct.type}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: "Giá sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditProduct.price}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Số lượng sản phẩm"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Loại sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditProduct.countInStock}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[
              {
                required: true,
                message: "Loại sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditProduct.rating}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả sản phẩm"
            name="description"
            rules={[
              {
                required: true,
                message: "Mô tả sản phẩm",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditProduct.description}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh sản phẩm"
            name="description"
            rules={[
              {
                required: true,
                message: "Hình ảnh sản phẩm",
              },
            ]}
          >
            <WrapperUploadFile onChange={handleOnchangeAvatarEdit} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {stateEditProduct?.image && (
              <img
                src={stateEditProduct?.image}
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
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
    </div>
  );
};

export default AdminProductComponent;
