// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, Form, Image, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  TruckFilled,
} from "@ant-design/icons";

import {
  CustomCheckbox,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
} from "./style";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";

import InputComponent from "../../components/inputComponent/InputComponent";
import ButtonCpmponent from "../../components/buttonCpmponent/ButtonCpmponent";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import ModalComponent from "../../components/modalComponent/ModalComponent";
import { convertPrice } from "../../utils";
import { updateUser } from "../../redux/slides/userSlide";
import StepComponent from "../../components/StepConponent/StepComponent";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";

function OrderPage() {
  const order = useSelector((state) => state.order);

  const user = useSelector((state) => state.user);

  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [numProduct, setNumProduct] = useState(1);

  const [form] = Form.useForm();

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onChange = (e) => {
    console.log(`check = ${e.target.value}`);
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };
  console.log("listChecked-onChange", listChecked);

  const handleChangeCount = (type, idProduct, limited, size, frame) => {
    console.log("listChecked-onChange", size, frame);
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct, size, frame }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct, size, frame }));
      }
    }
  };

  const handleDeleteOrder = (idProduct, size, frame) => {
    dispatch(removeOrderProduct({ idProduct, size, frame }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };
  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.totalPrice * cur.amount;
    }, 0);
    console.log("result-priceMemo", result);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.amount;
    }, 0);
    if (result === 0) {
      return 0;
    }
    if (result > 0 && result <= 2) {
      return 40000;
    }
    if (result >= 3 && result < 5) {
      return 60000;
    }
    return 0;
  }, [order]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleAddCard = () => {
    console.log("user added card", user);
    if (!order?.orderItemsSlected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };
  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;
  // const {
  //   data: dataAdd,
  //   isLoading: isLoadingAddOrder,
  //   isSuccess,
  //   isError,
  // } = mutationAddOrder;
  // console.log("mutationAddOrder",mutationAddOrder);

  // useEffect(() => {
  //   if (isSuccess  && dataAdd?.status === "OK") {
  //     message.success("Đặt hàng thành công");
  //   } else if (isError) {
  //     message.error("đặt hàng thất bại");
  //   }
  // }, [isSuccess, isError]);

  const handleUpdateInforUser = () => {
    console.log("Update-handleUpdateInforUser", stateUserDetails);
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };
  const itemsDelivery = [
    {
      description: "1 sản phẩm",
    },
    {
      description: "3 sản phẩm",
    },
    {
      description: "5 sản phẩm",
    },
  ];

  const reversedOrderItems = order?.orderItems?.slice().reverse();
  return (
    <div style={{ background: "#D3D3D3", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <div
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontSize: "30px",
            }}
          >
            Giỏ hàng
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeaderDilivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  order.orderItemsSlected.length === 0
                    ? 0 // Khi không có sản phẩm
                    : diliveryPriceMemo === 40000
                    ? 0 // Khi có 1 hoặc 2 sản phẩm (chi phí giao hàng là 40,000 VND)
                    : diliveryPriceMemo === 60000
                    ? 1 // Khi có 3 hoặc 4 sản phẩm (chi phí giao hàng là 60,000 VND)
                    : 2 // Khi có 5 sản phẩm trở lên (trường hợp còn lại)
                }
              />
              <TruckFilled
                style={{
                  fontSize: "30px",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  fontSize: "20px",
                }}
              >
                {" "}
                Miễn phí giao hàng từ 5 sản phẩm
              </span>
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></CustomCheckbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Khung</span>
                <span>Kích thước</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {reversedOrderItems.map((order) => {
                console.log("oder-page", order);
                
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <CustomCheckbox
                        onChange={onChange}
                        value={order?.product + order?.size + order?.frame}
                        checked={listChecked.includes(
                          order?.product + order?.size + order?.frame
                        )}
                      ></CustomCheckbox>
                      {/* <img
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      /> */}
                      <Image
                        src={order?.image}
                        alt="img product"
                        preview={true}
                        style={{
                          height: "77px",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {convertPrice(order?.totalPrice)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "decrease",
                              order?.product,
                              order?.amount === 1,
                              order?.size,
                              order?.frame
                            )
                          }
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInputNumber
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                          min={1}
                          max={order?.countInstock}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "increase",
                              order?.product,
                              order?.amount === order.countInstock,
                              order?.size,
                              order?.frame
                            )
                          }
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </WrapperCountOrder>
                      <div>{order?.size}</div>
                      <div>
                        {order?.frame == "none" ? "Không khung" : order?.frame}
                      </div>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.totalPrice * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteOrder(
                            order?.product,
                            order?.size,
                            order?.frame
                          )
                        }
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo style={{ marginBottom: "10px" }}>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${user?.address} ${user?.city}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: "#9255FD", cursor: "pointer" }}
                  >
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {`${priceDiscountMemo} VNĐ`}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(diliveryPriceMemo)}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonCpmponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: "rgb(87 196 202 / 95%)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Đặt hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
        {/* <LoadingComponent isLoading={isLoading}> */}
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          // onFinish={onUpdateUser}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <InputComponent
              value={stateUserDetails.name}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <InputComponent
              value={stateUserDetails["city"]}
              onChange={handleOnchangeDetails}
              name="city"
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your  phone!" }]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Adress"
            name="address"
            rules={[{ required: true, message: "Please input your  address!" }]}
          >
            <InputComponent
              value={stateUserDetails.address}
              onChange={handleOnchangeDetails}
              name="address"
            />
          </Form.Item>
        </Form>
        {/* </LoadingComponent> */}
      </ModalComponent>
    </div>
  );
}

export default OrderPage;
