// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import TableComponent from "../tableComponent/table";
import { convertPrice } from "../../utils";
import { orderContant } from "../../contant";
import InputComponent from "../inputComponent/InputComponent";

import { SnippetsOutlined, EditOutlined } from "@ant-design/icons";
import PieChartComponent from "../pieChartComponent/PieChartComponent";
import PieChartTypeComponent from "../pieChartComponent/PieChartTypeComponent";

import DrawerComponent from "../drawerComponent/DrawerComponent";
import { Button, Form, Image, message, Tabs } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHook";
import BarChartComponent from "../pieChartComponent/BarChartComponent ";
import LineChartComponent from "../pieChartComponent/LineChartComponent ";

const AdminOderComponent = () => {
  const user = useSelector((state) => state?.user);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  // const searchInput = useReff(null);
  const [rowSelected, setRowSelected] = useState("");

  const [stateEditOrder, setStateEditOrder] = useState({});
  const [stateDetailOrder, setStateDetailOrder] = useState({});

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenDrawerDetail, setIsOpenDrawerDetail] = useState(false);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };
  const queryOrder = useQuery({
    queryKey: ["ordersupdate"],
    queryFn: getAllOrder,
  });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;
  //console.log("orders", orders?.data);

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      //console.log("adminorder", order);
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
        isDelivered: order?.isDelivered ? "Đã giao hàng" : "Chưa giao hàng",
        totalPrice: convertPrice(order?.totalPrice),
      };
    });

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsOrder(rowSelected);
    }
  }, [rowSelected]);

  const handleEditOrder = () => {
    if (rowSelected) {
      fetchGetDetailsOrder(rowSelected);
      //setRowSelected("")
    }
    setIsOpenDrawer(true);
  };

  const handleDetailOrder = () => {
    if (rowSelected) {
      fetchGetDetailsOrder(rowSelected);
    }
    setIsOpenDrawerDetail(true);
  };

  const fetchGetDetailsOrder = async (rowSelected) => {
    const res = await OrderService.getDetailsOrder(rowSelected);
    // console.log("1111res", res?.data);
    if (res?.data) {
      setStateEditOrder({
        ...res.data,
      });
      setStateDetailOrder({
        ...res.data,
      });
    }
    console.log("stateEditOrder", stateEditOrder);
  };

  const handleOnChangeEdit = (e) => {
    setStateEditOrder({
      ...stateEditOrder,
      [e.target.name]: e.target.value,
    });
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = OrderService.updateOrder(id, token, { ...rests });
    return res;
  });
  const {
    data: dataUpdated,
    //isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  console.log("dataUpdated", dataUpdated);

  const onUpdateOrder = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateEditOrder,
      },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  const renderAction = () => {
    return (
      <div>
        <SnippetsOutlined
          style={{ fontSize: "30px", color: "black", cursor: "pointer" }}
          onClick={handleDetailOrder}
        />

        <EditOutlined
          style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
          onClick={handleEditOrder}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      //sorter: (a, b) => a.userName.length - b.userName.length,
      //...getColumnSearchProps("userName"),
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      // sorter: (a, b) => a.address.length - b.address.length,
      // ...getColumnSearchProps("address"),
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      // sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      // ...getColumnSearchProps("isPaid"),
    },
    {
      title: "Giao hàng",
      dataIndex: "isDelivered",
      // sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      // ...getColumnSearchProps("isDelivered"),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      // sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      // ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      // sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      // ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const handleCancel = () => {
    setIsOpenDrawer(false);
    stateEditOrder({});
    form.resetFields();
  };
  const handleCancel2 = () => {
    setIsOpenDrawerDetail(false);
    stateDetailOrder({});
    form2.resetFields();
  };

  useEffect(() => {
    if (isOpenDrawer) {
      form.setFieldsValue(stateEditOrder);
    }
  }, [form, stateEditOrder, isOpenDrawer]);

  useEffect(() => {
    if (!isOpenDrawerDetail) {
      form2.setFieldsValue(stateDetailOrder);
    }
  }, [form2, stateDetailOrder, isOpenDrawerDetail]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateEditOrder({
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

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật order thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error("Cập nhật order thất bại");
    }
  }, [isSuccessUpdated]);

  const onChange = (key) => {
    console.log(key);
  };
  // ...order,
  // key: order._id,
  // userName: order?.shippingAddress?.fullName,
  // phone: order?.shippingAddress?.phone,
  // address: order?.shippingAddress?.address,
  // paymentMethod: orderContant.payment[order?.paymentMethod],
  // isPaid: order?.isPaid ? "TRUE" : "FALSE",
  // isDelivered: order?.isDelivered ? "TRUE" : "FALSE",
  // totalPrice: convertPrice(order?.totalPrice),
  const customerInfo = (
    <div>
      <p>Tên: {stateEditOrder?.shippingAddress?.fullName}</p>
      <p>Địa chỉ: {stateEditOrder?.shippingAddress?.address}</p>
      <p>Số điện thoại: {stateEditOrder?.shippingAddress?.phone}</p>
    </div>
  );
  const customerOrder = (
    <div>
      {stateEditOrder?.orderItems?.map((item, index) => (
        //const finalPrice = item.totalPrice * (1 - item.discount / 100),
        <div key={index}>
          <div style={{ display: "flex" }}>
            <Image
              src={item.image}
              style={{
                width: "220px",
                height: "200px",
              }}
            />
            <div
              style={{
                marginLeft: "20px",
              }}
            >
              <p>Tên sản phẩm: {item.name}</p>
              <p>Số lượng: {item.amount}</p>
              <p>
                Giá: { convertPrice(item.totalPrice - ( item.totalPrice* (item.discount / 100)))}
              </p>
              <p>Kích thước: {item.size}</p>
              <p>Khung: {item.frame}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
  const items = [
    {
      key: "1",
      label: "Thông tin khách hàng",
      children: customerInfo,
    },
    {
      key: "2",
      label: "Thông tin đơn hàng",
      children: customerOrder,
    },
  ];
  return (
    <div>
      <div>
        <div style={{ display: "flex", marginBottom: "10px"}}>
          <div style={{ height: 200, width: 250 }}>
            Thống kê đơn hàng theo type
            <PieChartTypeComponent data={orders?.data} field="type" />
          </div>
          <div style={{ height: 200, width: 250 }}>
           Thống kê đơn hàng đã giao
            <PieChartComponent data={orders?.data} field="isDelivered" />
          </div>
          {/* <div style={{ height: "100px",  width: 250 }}>
            Thống kê đơn hàng đã giao
            <LineChartComponent data={orders?.data} field="isDelivered" />
          </div> */}
        </div>
        <TableComponent
          //handleDelteMany={handleDelteManyProducts}
          columns={columns}
          data={dataTable}
          onRow={(record, index) => {
            //console.log("record_id", record);
            return {
              onClick: (event) => {
                console.log("record_id", record._id);
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      <DrawerComponent
        title={<span style={{ color: "#ADD8E6" }}>Cập nhật giao hàng</span>}
        isOpen={isOpenDrawer}
        onClose={handleCancel}
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
          onFinish={onUpdateOrder}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span style={{ color: "#FFC107" }}>Trạng thái thanh toán</span>
            }
            name="isPaid"
            rules={[
              {
                required: true,
                message: "Nhập trạng thái thanh toán",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditOrder.isPaid}
              name="isPaid"
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ color: "#FF69B4" }}>Trạng thái giao hàng</span>
            }
            name="isDelivered"
            rules={[
              {
                required: true,
                message: "Trạng thái giao hàng",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChangeEdit}
              value={stateEditOrder.isDelivered}
              name="isDelivered"
            />
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

      <DrawerComponent
        title={<span style={{ color: "black" }}>Chi tiết đơn hàng</span>}
        isOpen={isOpenDrawerDetail}
        onClose={handleCancel2}
        width="83%"
        style={{
          borderTopLeftRadius: "15px",
          backgroundColor: "#fff",
          color: "#FFD514",
        }}
      >
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </DrawerComponent>
    </div>
  );
};

export default AdminOderComponent;
