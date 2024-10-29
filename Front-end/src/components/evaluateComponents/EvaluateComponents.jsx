import React, { useState } from "react";
import ButtonCpmponent from "../buttonCpmponent/ButtonCpmponent";
import { Button, Modal, Form, Space, Select, message } from "antd";
import InputComponent from "../inputComponent/InputComponent";
import { WrapperUploadFile } from "../adminProductComponent/style";
import { UploadOutlined } from "@ant-design/icons";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as EvaluateService from "../../services/EvaluateService";
import { getBase64 } from "../../utils";
const EvaluateComponents = (Eva) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluateProduct, setEvaluateProduct] = useState({});
  //console.log("Evaluate idProduct", Eva.idProduct);
  //console.log("Evaluate user", Eva.idUser);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
    setEvaluateProduct({
      ratingEvaluate: "",
      commentEvaluate: "",
      imgEvaluate: "",
      idProduct: "",
      userId: "",
    });
    //form.resetFields();
  };

  const mutation = useMutationHooks((data) => {
    const { ratingEvaluate, commentEvaluate, imgEvaluate, idProduct, userId } =
      data;
    console.log("data", data);

    const res = EvaluateService.createEvaLuate({
      ratingEvaluate,
      commentEvaluate,
      imgEvaluate,
      idProduct,
      userId,
    });
    console.log("res-danhgia", res);
    return res;
  });
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setEvaluateProduct({
      ...evaluateProduct,
      imgEvaluate: file.preview,
    });
  };
  const onFinish = () => {
    const params = {
      ratingEvaluate: evaluateProduct.ratingEvaluate,
      commentEvaluate: evaluateProduct.commentEvaluate,
      imgEvaluate: evaluateProduct.imgEvaluate,
      idProduct: Eva.idProduct,
      userId: Eva.idUser,
    };
    console.log("onFinish", params);
    mutation.mutate(params, {
      onSuccess: () => {
        message.success("Thêm đánh giá thành công");
        handleCancel();
      },
      onError: () => {
        message.error("Thêm đánh giá thất bại");
      },
    });
  };
  const handleOnChange = (e) => {
    console.log("onChange", e.target.value);
    setEvaluateProduct({
      ...evaluateProduct,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <ButtonCpmponent
        onClick={showModal}
        //onClick={() => handleCanceOrder(order)}
        size={40}
        styleButton={{
          height: "36px",
          border: "1px solid #9255FD",
          borderRadius: "4px",
        }}
        textButton={"Đánh giá"}
        styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
      ></ButtonCpmponent>

      <Modal
        forceRender
        footer={null}
        title="Viết đánh giá"
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
            label="Nội dung đánh giá"
            name="commentEvaluate"
            rules={[
              {
                required: true,
                message: "Nhập nội dung đánh giá",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={evaluateProduct.commentEvaluate}
              name="commentEvaluate"
            />
          </Form.Item>

          <Form.Item
            label="Số sao"
            name="ratingEvaluate"
            rules={[
              {
                required: true,
                message: "Từ 1 đến 5 sao",
              },
            ]}
          >
            <InputComponent
              onChange={handleOnChange}
              value={evaluateProduct.ratingEvaluate}
              name="ratingEvaluate"
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh sản phẩm"
            name="imgEvaluate"
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
            {evaluateProduct?.imgEvaluate && (
              <img
                src={evaluateProduct?.imgEvaluate}
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
    </div>
  );
};

export default EvaluateComponents;
