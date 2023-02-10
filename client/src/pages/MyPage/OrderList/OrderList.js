import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UpdateInfoModal from './UpdateInfoModal';

export default function OrderList({ data }) {
  const [orderData, setOrderData] = useState();
  const [isToUpdate, setIsToUpdate] = useState(false);

  const updateOrderHandler = () => {
    setIsToUpdate(true);
  };

  const cancelOrderHandler = () => {
    axios
      .delete(`http://localhost:5001/order/${data.order_id}`) // path에 orderid추가하기
      .then(() => alert('주문이 취소되었습니다.'));
  };

  return (
    <Container>
      <NewButton onClick={updateOrderHandler}>배송지 정보 수정하기</NewButton>
      <OrderInfos>
        {data.map(el => (
          <div className="order" key={el.order_id}>
            <OrderInfoById>
              <ul className="total-ul-tab">
                <li>
                  <span className="bold">주문일자</span> <span>|</span>
                  <span>{el.date}</span>
                </li>
                <li>
                  <span className="bold">배송상태</span> <span>|</span>
                  <span>{el.status}</span>
                </li>
                <li>
                  <span className="bold">총가격</span> <span>|</span>
                  <span>{el.total_price}</span>
                </li>
              </ul>
            </OrderInfoById>
            <TitleTab>
              <ul className="tabs">
                <li className="p-image">상품</li>
                <li className="p-count">상품 개수</li>
                <li className="p-name">상품명</li>
                <li className="p-price">가격</li>
              </ul>
            </TitleTab>
            <Infos>
              <ul className="item-tabs">
                {el.items.map(el => (
                  <div className="show-items" key={el.product}>
                    <li className="image-info">
                      <img src={el.image} alt={el.products} />
                    </li>
                    <li>{el.count}</li>
                    <li>{el.products}</li>
                    <li>
                      {el.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      KRW
                    </li>
                  </div>
                ))}
              </ul>

              <StyledButton width="70px" onClick={cancelOrderHandler}>
                주문 취소
              </StyledButton>
            </Infos>
          </div>
        ))}
      </OrderInfos>
      {isToUpdate ? (
        <UpdateInfoModal
          setIsToUpdate={setIsToUpdate}
          orderId={data.order_id}
        />
      ) : (
        ''
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const OrderInfoById = styled.div`
  background-color: rgba(153, 164, 151, 1);
  width: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-size: 18px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  > .total-ul-tab {
    display: flex;
    width: 100%;
    justify-content: space-around;
    > li {
      > span {
        margin: 0px 2px;
      }
      > .bold {
        font-weight: 700;
      }
    }
  }
`;

const OrderInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  > .order {
    margin-top: 20px;
    width: 60%;
    border-radius: 20px;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > .order-number {
      font-weight: 900;
      font-size: 15px;
      margin-bottom: 30px;
    }
  }
`;

const TitleTab = styled.div`
  width: 100%;
  margin: 30px 0px;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  > .tabs {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > li {
      width: 100%;
      text-align: center;
      border-right: 2px solid #373837;
      color: #373837;
      &:last-child {
        border-right: none;
      }
    }
  }
`;

const Infos = styled.div`
  width: 100%;

  .item-tabs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .show-items {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      > li {
        font-size: 18px;
        height: 100px;
        margin: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 90px;
          width: 90px;
        }
      }
    }
  }
`;

const StyledButton = styled.button`
  background-color: rgba(153, 164, 151, 1);
  color: rgb(59, 59, 59);
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  height: 40px;
  padding: 5px;
  width: 100px;
  text-align: center;
  transition: 0.25s;
  margin-bottom: 40px;
  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
`;

const NewButton = styled(StyledButton)`
  color: rgb(59, 59, 59);
  background-color: white;
  width: 200px;
  border: 1px solid rgba(153, 164, 151, 1);
`;
