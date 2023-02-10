import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Line from '../../components/line';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductItem from './Cart';

function Cart() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkItems, setCheckItems] = useState([]);

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      productList.forEach(el => idArray.push(el._id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const deleteAll = () => {
    setProductList([]);
  };

  /** 주문하기 버튼
   *  purchase라는 키값으로 체크한 상품 데이터 local storage에 저장
   *  주문한 상품은 장바구니에서 제거
   *  order 페이지로 redirect
   */
  const handleOrder = () => {
    localStorage.setItem(
      'purchase',
      JSON.stringify(
        productList.filter(product => checkItems.includes(product._id))
      )
    );
    localStorage.setItem(
      'cart',
      JSON.stringify(
        productList.filter(product => !checkItems.includes(product._id))
      )
    );
    navigate('/order');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(productList));
    let count = 0;
    let price = 0;
    productList.forEach(product => {
      if (checkItems.includes(product._id)) {
        count += product.count;
        price += product.price * product.count;
      }
    });
    setTotalCount(count);
    setTotalPrice(price);
  }, [productList, checkItems]);
  return (
    <Container>
      <MainDiv>
        <Title>장바구니</Title>
        <Main>
          <Info>
            <Item>
              <Checkbox
                type="checkbox"
                checked={checkItems.length === productList.length}
                onChange={e => {
                  handleAllCheck(e.target.checked);
                }}
              />
            </Item>
            <Item>상품사진</Item>
            <Item>상품명</Item>
            <Item>수량</Item>
            <Item>사이즈</Item>
            <Item>가격</Item>
            <Item>삭제</Item>
          </Info>
          {productList.map(({ _id, name, price, size, count, image }) => (
            <ProductItem
              key={_id}
              name={name}
              id={_id}
              price={price}
              image={image}
              // size={size}
              count={count}
              setProductList={setProductList}
              setCheckItems={setCheckItems}
              checkItems={checkItems}
            />
          ))}
          <Line widthLength="95%" />
          <TotalContainer>
            <TotalCount>총 {totalCount}개</TotalCount>
            <TotalPrice>
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} KRW
            </TotalPrice>
          </TotalContainer>
          <ButtonWrapper>
            <DeleteButton
              disabled={productList.length === 0}
              onClick={deleteAll}
            >
              전체 삭제
            </DeleteButton>
            <OrderButton
              disabled={checkItems.length === 0}
              onClick={handleOrder}
            >
              주문하기
            </OrderButton>
          </ButtonWrapper>
        </Main>
      </MainDiv>
    </Container>
  );
}

const Container = styled.div`
  margin: 70px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainDiv = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 25px;
  padding: 0px 30px;
  font-weight: 600;
  margin-bottom: 25px;
  align-self: flex-start;
`;

const Main = styled.div`
  width: 1000px;
  min-height: 500px;
  position: relative;
  background-color: #efefef;
  border-radius: 12px;
`;

const Checkbox = styled.input`
  zoom: 1.5;
`;

const Info = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 120px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: rgba(153, 164, 151, 1);
  margin-bottom: 20px;
`;
const Item = styled.li`
  font-size: 20px;
  font-weight: 600;
  width: 140px;
  text-align: center;
`;

const TotalContainer = styled.div`
  width: 90%;
  display: flex;
  margin: 30px auto;
  font-size: 20px;
  font-weight: 500;
`;

const TotalCount = styled.span`
  margin-right: auto;
`;
const TotalPrice = styled.span`
  margin-left: auto;
`;

const ButtonWrapper = styled.div`
  margin: 20px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const OrderButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: rgba(153, 164, 151, 1);
  color: rgb(59, 59, 59);
  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
`;

const DeleteButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: rgba(153, 164, 151, 1);
  color: rgb(59, 59, 59);
  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
`;

export default Cart;
