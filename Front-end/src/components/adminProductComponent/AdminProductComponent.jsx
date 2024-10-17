import React, { useState, useEffect, useRef } from "react";
import {
  AppstoreAddOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Modal, Form, Space, Select } from "antd";
import TableComponent from "../tableComponent/table";
import InputComponent from "../inputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/messageComponent/messageComponent";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../drawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../modalComponent/ModalComponent";

const AdminProductComponent = () => {
  const user = useSelector((state) => state?.user);
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    newType: "",
    discount: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeProducts, setTypeProducts] = useState([]);

  ////////////////////////////////
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  ////////////////////////////////

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

  // const onFinish = () => {
  //   mutation.mutate(stateProduct),
  //     {
  //       onSettled: () => {
  //         queryProduct.refetch();
  //       },
  //     };
  //   console.log("Success:", stateProduct);
  // };
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    };
    mutation.mutate(params, {
      onSuccess: () => {
        // Gọi refetch để cập nhật dữ liệu bảng sau khi thêm thành công
        queryProduct.refetch();
        //message.success("Thêm sản phẩm thành công");
        handleCancel();
      },
      onError: () => {
        message.error("Thêm sản phẩm thất bại");
      },
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateEditProduct,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
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
  ///////////////////////////////////////
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    console.log("data-test", data);
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });
  ///////////////////////////////////////

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
    if (!isModalOpen) {
      form.setFieldsValue(stateEditProduct);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateEditProduct, isModalOpen]);

  useEffect(() => {
    if (rowSelected) {
      //setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);
  ////////////////////////////////
  const handleEditProduct = () => {
    // console.log("rowSelected", rowSelected);
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
    setIsOpenDrawer(true);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDelteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  /////////////////////////////////////////////////////////

  // eslint-disable-next-line no-unused-vars
  const { data, isPending, isError, isSuccess } = mutation;
  const {
    data: dataUpdated,
    //isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  console.log("dataUpdated", dataUpdated);

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDelectedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "30px", color: "red", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
          onClick={handleEditProduct}
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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  ////////////////////////////////
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await ProductService.getAllProduct();
      return res;
    },
  });

  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });
  console.log("typeProduct-type", typeProduct);
  const { data: products } = queryProduct;

  console.log("data-product", products);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">200000",
          value: ">=",
        },
        {
          text: "<=200000",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price > 200000;
        }
        return record.price <= 200000;
      },
    },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    // },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.type - b.type,
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
      key: `${product._id}`,
    }));
  ////////////////////////////////
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

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === "OK") {
      message.success("Xóa thành công");
    } else if (isErrorDeletedMany) {
      message.error("Xóa không thành công");
    }
  }, [isSuccessDelectedMany]);
  console.log("mutation", mutation);
  ////////////////////////////////
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

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateEditProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
    });
    form.resetFields();
  };
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
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
          handleDelteMany={handleDelteManyProducts}
          columns={columns}
          data={dataTable}
          onRow={(record, index) => {
            //console.log("record_id", record._id);
            return {
              onClick: (event) => {
                setRowSelected(record._id);
                //console.log("record-id", record._id);
              },
            };
          }}
        />
      </div>

      <Modal
        forceRender
        footer={null}
        title="Thêm sản phẩm"
        open={isModalOpen}
        //onOk={handleOk}
        //onFinish={onFinish}
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
            {/* <InputComponent
              onChange={handleOnChange}
              value={stateProduct.type}
              name="type"
            /> */}
            <Select
              name="type"
              defaultValue=""
              value={stateProduct.type}
              style={{ width: 120 }}
              onChange={handleChangeSelect}
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>
          {stateProduct.type === "add_type" && (
            <Form.Item
              label="New type"
              name="newType"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <InputComponent
                value={stateProduct.newType}
                // eslint-disable-next-line no-undef
                onChange={handleOnChange}
                name="newType"
              />
            </Form.Item>
          )}

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
            label="Giảm giá"
            name="discount"
            rules={[
              {
                required: true,
                message: "Giảm giá",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={stateProduct.discount}
              name="discount"
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
                message: "Số lượng sản phẩm",
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
                message: "Đánh giá",
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
            label="Giảm giá"
            name="discount"
            rules={[
              {
                required: true,
                message: "Giảm giá",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditProduct.discount}
              name="discount"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh sản phẩm"
            name="image"
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
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onOk={handleDeleteProduct}
        onCancel={handleCancelDelete}
      >
        <div>Bạn có muốn xóa sản phẩm này không</div>
      </ModalComponent>
    </div>
  );
};

export default AdminProductComponent;
