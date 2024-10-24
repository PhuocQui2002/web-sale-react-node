import React from "react";
import PropTypes from "prop-types";
import { Avatar, Image, Rate, Typography } from "antd";
import * as EvaluateService from "../../services/EvaluateService";
import * as UserService from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import {
  ReviewSection,
  ReviewItem,
  ReviewImages,
  ReviewContent,
} from "./style";
import { useSelector } from "react-redux";

const ProductEvaluateComponent = ({ idProductEvaluate }) => {
  const user = useSelector((state) => state?.user);
  console.log("user-ProductEvaluateComponent", user);

  const fetchDetailsEvaluate = async () => {
    const res = await EvaluateService.getAllOrderByProductId(idProductEvaluate);
    return res.data;
  };

  const queryEvaluate = useQuery({
    queryKey: ["Evaluate-details-test"],
    queryFn: fetchDetailsEvaluate,
  });

  const { isLoading, data } = queryEvaluate;

  const fetchDetailUser = async (idUser, token) => {
    const res = await UserService.getDetailsUser(idUser, token);
    return res.data;
  };
  const UserAvatar = ({ userId, token, rating }) => {
    const { data: userData, isLoading } = useQuery({
      queryKey: ["user-avatar", userId],
      queryFn: () => fetchDetailUser(userId, token),
    });

    if (isLoading) {
      return <Avatar size={64} icon="user" />;
    }

    return (
      <div style={{ display: "flex" }}>
        <Avatar size={64} src={userData?.avatar} />
        <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
          <p style={{ margin: "6px" }}>{userData?.name}</p>
          <Rate value={rating} disabled />
        </div>
      </div>
    );
  };

  return (
    <ReviewSection>
      <Typography.Title level={3}>Đánh giá sản phẩm</Typography.Title>
      {data?.length > 0 ? (
        data.map((data, index) => (
          <ReviewItem
            key={index}
            style={{
              borderRadius: "6px",
              boxShadow: "0 12px 12px #ccc",
            }}
          >
            <UserAvatar
              userId={data.userId}
              token={user.access_token}
              rating={data.ratingEvaluate}
            />
            <ReviewContent>
              <p>Ngày đánh giá: {data.createdAt.substring(0, 10)}</p>
              <p>Nội dung: {data.commentEvaluate}</p>
              <ReviewImages>
                <p>Hình ảnh:</p>
                <Image
                  style={{
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                  src={data.imgEvaluate}
                />
              </ReviewImages>
            </ReviewContent>
          </ReviewItem>
        ))
      ) : (
        <p>Chưa có đánh giá nào</p>
      )}
    </ReviewSection>
  );
};

// Sử dụng PropTypes để định nghĩa kiểu dữ liệu cho props
ProductEvaluateComponent.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ProductEvaluateComponent;
