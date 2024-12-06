import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

// export const WrapperHeader = styled(Row)`
//   //background-color: rgb(26, 148, 255);
//   background-color: black;

//   padding: 10px 0px;
//   align-items: center;
//   gap: 16px;
//   flex-wrap: nowrap;
//   width: 1270px;
// `;

// export const WrapperTextHeader = styled(Link)`
//   font-size: 18px;
//   color: #fff;
//   font-weight: bold;
//   text-align: left;
//   &:hover {
//     font-size: 18px;
//     color: #fff;
//   }
// `;

// export const WrapperHeaderAccout = styled.div`
//   display: flex;
//   align-items: center;
//   color: #fff;
//   gap: 10px;
//   max-width: 200px;
// `;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;
export const WrapperSearch = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;
export const WrapperCart = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 1024px) {
    gap: 6px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    margin-top: 8px;
  }

  .ant-badge {
    font-size: 20px;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
    @media (max-width: 768px) {
  .cart-wrapper {
    font-size: 12px; /* Giảm kích thước chữ */
  }

  .cart-icon {
    font-size: 24px; /* Giảm kích thước biểu tượng */
  }
}
`;
export const WrapperHeader = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 10px 20px;
  width: 100%;
  max-width: 1270px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Để các thành phần xuống dòng nếu màn hình nhỏ */
  }
`;

export const WrapperTextHeader = styled(Link)`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;

  &:hover {
    font-size: 18px;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
    width: 100%;
  }
`;
export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  max-width: 200px;

  @media (max-width: 1024px) {
    gap: 8px;
    max-width: 150px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;
