import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
  margin-bottom: 4px;
`;

export const WrapperContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: inherit;
`;
export const FormatText = styled.p`
  width: 260,
  overflow: "hidden",
  ext-overflow: "ellipsis",
  white-space: "nowrap",
  margin-left: "10px",
  font-size: "20px",

`;

export const WrapperLeft = styled.div`
  width: 910px;
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  //padding-top: 20px;
`;
export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid rgb(235, 235, 240);
  width: 100%;
  align-items: flex-end;
  padding-top: 10px;
`;

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: flex-start;
  height: 200px;
  width: 100%;
  margin-top: 20px;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 100%;
  //margin: 0 auto;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 12px 12px #ccc;
`;

export const WrapperStatus = styled.div`
  display: flex;
  align-item: flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(235, 235, 240);
  flex-direction: column;
`;
export const BreadcrumbWrapper = styled.div`

  height: 40px;
  background-color: #e0eaf4; /* Màu nền nhẹ */
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;

  .breadcrumb-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .breadcrumb-icon {
      width: 14px;
      margin-right: 8px;
      color: #007bff;
    }

    .breadcrumb-separator {
      width: 10px;
      color: #999;
      margin-right: 8px;
    }
  }

  .breadcrumb-current {
    color: #666;
  }

  /* Responsive */
  @media (max-width: 768px) { /* Tablet */
  width: 30px;
    flex-direction: column;
    align-items: flex-start;
    height: auto; /* Tự điều chỉnh chiều cao */
    padding: 10px;
    font-size: 13px;

    .breadcrumb-link {
      margin-bottom: 5px; /* Tạo khoảng cách giữa các phần */
    }
  }

  @media (max-width: 480px) { /* Điện thoại */
    font-size: 12px;
    width: 390px;
    .breadcrumb-link .breadcrumb-icon {
      width: 12px;
    }

    .breadcrumb-link .breadcrumb-separator {
      width: 8px;
    }
  }
`;


//// RESPonsive

// export const WrapperContainer = styled.div`
//   width: 100%;
//   height: 100vh;
//   background-color: inherit;

//   @media (max-width: 768px) { /* Màn hình iPad và nhỏ hơn */
//     height: auto;
//     padding: 0 10px;
//   }
// `;

// export const WrapperListOrder = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   //padding-top: 20px;

//   @media (max-width: 768px) { /* iPad */
//     padding-top: 10px;
//     gap: 10px;
//   }
// `;

// export const WrapperItemOrder = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 9px 16px;
//   background: #fff;
//   margin-top: 12px;
//   flex-direction: column;
//   width: 100%;
//   border-radius: 6px;
//   box-shadow: 0 12px 12px #ccc;

//   @media (max-width: 768px) { /* iPad */
//     padding: 8px 12px;
//     flex-direction: column;
//     box-shadow: 0 8px 8px #bbb;
//   }

//   @media (max-width: 480px) { /* Điện thoại */
//     width: 390px;

//     padding: 6px 8px;
//     margin-top: 8px;
//   }
// `;

// export const WrapperHeaderItem = styled.div`
//   display: flex;
//   align-items: flex-start;
//   height: auto; /* Cho phép nội dung co giãn */
//   width: 100%; /* Chiếm toàn bộ chiều ngang */
//   margin: 0; /* Xóa margin */
//   padding: 0; /* Xóa padding */

//   @media (max-width: 768px) {
//     flex-direction: column; /* Đối với iPad */
//   }

//   @media (max-width: 480px) {
//     align-items: flex-start; /* Canh lề trái cho điện thoại */
//   }
// `;



// export const WrapperFooterItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   border-top: 1px solid rgb(235, 235, 240);
//   width: 100%;
//   align-items: flex-end;
//   padding-top: 10px;

//   @media (max-width: 768px) { /* iPad */
//     align-items: baseline;
//     padding-top: 8px;
//   }

//   @media (max-width: 480px) { /* Điện thoại */
//     width: 39px;

//     gap: 6px;
//   }
// `;

// export const WrapperStatus = styled.div`
//   display: flex;
//   align-item: flex-start;
//   width: 100%;
//   margin-bottom: 10px;
//   padding-bottom: 10px;
//   border-bottom: 1px solid rgb(235, 235, 240);
//   flex-direction: column;

//   @media (max-width: 768px) { /* iPad */
//     margin-bottom: 8px;
//     padding-bottom: 8px;
//   }

//   @media (max-width: 480px) { /* Điện thoại */
//     margin-bottom: 6px;
//     padding-bottom: 6px;
//   }
// `;

// export const FormatText = styled.p`
//   width: 260px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   margin-left: 10px;
//   font-size: 20px;

//   @media (max-width: 768px) { 
//     font-size: 18px;
//     margin-left: 6px;
//   }

//   @media (max-width: 480px) { /* Điện thoại *
//     font-size: 16px;
//     margin-left: 0px;
//   }
// `;




