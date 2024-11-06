import { Form, message, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";

import ButtonCpmponent from "../../components/buttonCpmponent/ButtonCpmponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useMemo } from "react";

import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as CartService from "../../services/CartService";

import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from "../../services/PaymentService";
import ModalComponent from "../../components/modalComponent/ModalComponent";
import InputComponent from "../../components/inputComponent/InputComponent";
import { MDBIcon } from "mdb-react-ui-kit";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
 // console.log("order-payment1", order?.orderItemsSlected);
  const user = useSelector((state) => state.user);

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    //city: "",
  });
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        //city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.totalPrice * cur.amount;
    }, 0);
    //console.log("result", result);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (cur.totalPrice * totalDiscount * cur.amount) / 100;
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
    return 1;
  }, [order]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSlected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      //user?.city &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSlected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        //city: user?.city,
        paymentMethod: payment,
        shippingMethod: delivery,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        email: user?.email,
        // size: order?.size,
        // frame: order?.frame
      });
    }
  };
  //console.log("order-payment", order);
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    //console.log("order-payment-token", token);
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;
  const {
    data: dataAdd,
    isPending: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;

  console.log("mutationAddOrder", mutationAddOrder);
  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      console.log("order?.orderItemsSlected", order?.orderItemsSlected)
      const arrayOrdered = order?.orderItemsSlected?.map(
        (element) => `${element.product}${element.size}${element.frame}`
      );
      CartService.deleteOrderItemCart(user?.id, order?.orderItemsSlected, user?.access_token);
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));

      message.success("Đặt hàng thành công");
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSlected,
          diliveryPriceMemo: diliveryPriceMemo,
          totalPriceMemo: totalPriceMemo,
        },
      });
    } else if (isError) {
      message.error("đặt hàng thất bại");console.error("Lỗi đặt hàng:", mutationAddOrder.error);
    }
  }, [isSuccess, isError]);

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

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSlected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      //city: user?.city,
      paymentMethod: payment,
      shippingMethod: delivery,
      itemsPrice: priceMemo,
      shippingPrice: diliveryPriceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
    });
  };

  const handleUpdateInforUser = () => {
    const { name, address, phone } = stateUserDetails;
    if (name && address && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
    console.log("dataCLIENT_ID: " + data);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
     <LoadingComponent isPending={isLoadingAddOrder}>
     <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Thanh toán</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức giao hàng</Lable>
                <WrapperRadio onChange={handleDilivery} value={delivery}>
                  <Radio value="fast">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      FAST
                    </span>{" "}
                    Giao hàng nhanh
                  </Radio>
                  <Radio value="gojek">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      GO_JEK
                    </span>{" "}
                    Giao hàng tiết kiệm
                  </Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money">
                    {" "}
                    Thanh toán tiền mặt khi nhận hàng
                  </Radio>
                  <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${user?.address}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: "#9255FD", cursor: "pointer" }}
                  >
                    <MDBIcon fas icon="edit" />
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
                    {convertPrice(priceDiscountMemo)}
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
            {payment === "paypal" && sdkReady ? (
              <div
                style={{
                  height: "48px",
                  width: "320px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                <PayPalButton
                  amount={Math.round(totalPriceMemo / 25000)}
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={onSuccessPaypal}
                  onError={() => {
                    alert("Lỗi kết nối Paypal");
                  }}
                />
              </div>
            ) : (
              <ButtonCpmponent
              onClick={() => handleAddOrder()}
              size={40}
              styleButton={{
                background: "#3b71ca",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                display: "inline-block",
                padding: "0.5rem 1rem",
                transition: "background-color 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 9px -4px rgba(0, 0, 0, 0.2)",
              }}
              textButton={"Thanh toán"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
            )}
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
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
              value={stateUserDetails["name"]}
              onChange={handleOnchangeDetails}
              name="name"
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
      </ModalComponent>
     </LoadingComponent>
    </div>
  );
};

export default PaymentPage;
