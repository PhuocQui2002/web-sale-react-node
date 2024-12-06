import styled from "styled-components";
import ButtonComponent from "../../components/buttonCpmponent/ButtonCpmponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #9255FD;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

// export const WrapperProducts = styled.div`
//     display: flex;
//     gap: 30px;
//     margin-top:20px;
//     flex-wrap: wrap;
// `

export const WrapperProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Hiển thị 1 sản phẩm mỗi hàng trên màn hình nhỏ */
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr); /* Hiển thị 5 sản phẩm mỗi hàng trên màn hình rộng */
  }
`;
