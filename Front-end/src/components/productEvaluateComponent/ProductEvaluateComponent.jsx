import React, { useEffect, useState } from "react";
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
  const [evaluate, setEvaluate] = useState();

  //console.log("user-ProductEvaluateComponent", user);

  const fetchDetailsEvaluate = async () => {
    const res = await EvaluateService.getAllOrderByProductId(idProductEvaluate);
    setEvaluate(res.data);
  };

 

  const fetchDetailUser = async (idUser, token) => {
    const res = await UserService.getDetailsUser(idUser, token);
    return res.data;
  };
  useEffect(() => {
    fetchDetailsEvaluate();
  }, []);
 
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
    <ReviewSection style={{ padding: "20px", backgroundColor: "#F5F5F5", borderRadius: "8px" }}>
      <Typography.Title level={3} style={{ textAlign: "center", color: "#333" }}>Đánh giá sản phẩm</Typography.Title>
      {evaluate?.length > 0 ? (
        evaluate.map((data, index) => (
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
              {data.imgEvaluate ? <ReviewImages>
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
              </ReviewImages> : <dicv></dicv> }
              
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
