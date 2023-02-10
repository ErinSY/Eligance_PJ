import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Line from '../../components/line';
import StyledButton from '../../components/StyledButton';
import OrderList from './OrderList';
import API from '../../API';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Wrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const InlineWrap = styled.div`
  display: block;
  font-size: 0;
  margin: 0 60px;
`;

const CardWrap = styled.div`
  display: inline-block;
  width: ${props => props.width};
  padding: 0 3vh 0 3vh;
  vertical-align: middle;
  box-sizing: border-box;
`;

const OrderCard = styled.div`
  height: ${props => props.height};
  font-size: initial;
  background: rgba(217, 217, 217, 1);
  border-radius: 20px;
  margin: 5vh 0 0 0;
`;

const OrderCardColor = styled.div`
  height: 10vh;
  background-color: rgba(153, 164, 151, 1);
  border-radius: 20px 20px 0 0;
`;

const OrderHeading = styled.div`
  margin: 8vh 0 0 8vh;
  font-size: 30px;
  font-weight: 600;
`;

const OrderboxText = styled.p`
  font-size: 1.4em;
  font-weight: 500;
  padding: 3.5vh 0 0 3vh;
`;

const StyledCheckbox = styled.input.attrs(props => ({
  type: 'radio',
}))`
  width: 20px;
  height: 20px;
  border: 1px solid #999;
  margin: 3vh 0 0 4vh;
`;

const OrderboxInnerText = styled.label`
  font-size: 1.2em;
`;

const PersonalOrderInnerText = styled(OrderboxInnerText)`
  margin-left: 4vh;
  font-weight: 600;
`;

const TextWrap = styled.div`
  float: left;
  margin: 0 10vh 0 0;
  text-align: center;
`;

const TextMargin = styled.div`
  margin: 4vh 0 0 0;
`;

const PicWrap = styled.div`
  padding: 10vh 0 0 13vh;
`;

const ItemWrap = styled.div`
  margin: 0vh 30vh 4vh 0vh;
  float: left;
`;

const ItemImg = styled.img`
  width: 25vh;
  height: 20vh;
`;

const DATA = [
  { name: 'bag', price: '1000', brand: 'Chanel' },
  { name: 'shoes', price: '2000', brand: 'Dior' },
];

function TotalPrice({ ordereditem }) {
  const count = 0;
  return (
    <div>
      {ordereditem.map(i => (
        <div key={i}>
          <p>{parseInt(i.price)}</p>
          <p>{count}</p>
        </div>
      ))}
    </div>
  );
}

function OrderPage() {
  const [item, setItem] = useState([]);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    contact: '',
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(DATA));
    const dataFromLocalStorage = localStorage.getItem('data');
    const parsedData = JSON.parse(dataFromLocalStorage);
    setItem(parsedData);
    console.log(item);
    if (localStorage.getItem('userToken')) {
      const decoded = JSON.parse(localStorage.getItem('userToken'));
      console.log('decoded', decoded._id);
      axios
        .get(`http://localhost:5001/user/${decoded._id}`)
        .then(res => {
          console.log(res);
          setUser(prev => {
            return {
              ...prev,
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              address: res.data.address,
              contact: res.data.contact,
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const cartData = localStorage.getItem('cart');
    const parsedCartData = JSON.parse(cartData);

    try {
      let sum = 0;
      let total = 0;
      await axios.post(`http://localhost:5001/order`, {
        user_id: user.id,
        products: parsedCartData.map(i => i._id),
        address: user.address,
        // total_price: parsedCartData.map(i => {
        //   sum += i.price;
        //   total += sum;
        // return total;

        // }),
        total_price: 10000,
      });
    } catch (err) {
      console.log(`${err.response.data.message}`);
    }
  };

  const pay = ['가상계좌', '신용/체크카드', '토스페이', '네이버페이'];
  const userOrderInfo = ['이름', '연락처', '주소', '이메일'];
  const orderedItemIndex = ['상품명', '브랜드', '상품 가격'];
  const orderedItemInfo = [item.name, item.brand, item.price];
  const orderedItemTotal = [item.length];

  return (
    <Wrap>
      <OrderHeading>
        {item.map(item => (
          <div key={item.price}>
            <p>{item.price + item.name}</p>
          </div>
        ))}
      </OrderHeading>
      <InlineWrap>
        <CardWrap width="50%">
          <OrderCard height="40vh">
            <OrderCardColor>
              <OrderboxText>결제수단</OrderboxText>
            </OrderCardColor>
            {pay.map(info => (
              <div key={info}>
                <StyledCheckbox name="pay" />
                <OrderboxInnerText>&nbsp;&nbsp;{info}</OrderboxInnerText>
              </div>
            ))}
          </OrderCard>
        </CardWrap>
        <CardWrap width="50%">
          <OrderCard height="40vh">
            <OrderCardColor>
              <OrderboxText>주문자 정보</OrderboxText>
            </OrderCardColor>
            <TextWrap>
              {userOrderInfo.map(info => (
                <TextMargin key={info}>
                  <PersonalOrderInnerText>{info}</PersonalOrderInnerText>
                </TextMargin>
              ))}
            </TextWrap>
            <TextWrap>
              <TextMargin>
                <OrderboxInnerText>{user.name}</OrderboxInnerText>
              </TextMargin>
              <TextMargin>
                <OrderboxInnerText>{user.contact}</OrderboxInnerText>
              </TextMargin>
              <TextMargin>
                <OrderboxInnerText>{user.address}</OrderboxInnerText>
              </TextMargin>
              <TextMargin>
                <OrderboxInnerText>{user.email}</OrderboxInnerText>
              </TextMargin>
            </TextWrap>
          </OrderCard>
        </CardWrap>
        <CardWrap width="100%">
          <OrderCard height="90vh">
            <OrderCardColor>
              <OrderboxText>주문상품/금액</OrderboxText>
            </OrderCardColor>
            <PicWrap>
              <ItemWrap>
                <ItemImg alt="orderitem" src="/image/bottega2.jpg" />
              </ItemWrap>
              <TextWrap>
                {orderedItemIndex.map(info => (
                  <div key={info}>
                    <PersonalOrderInnerText>{info}</PersonalOrderInnerText>
                  </div>
                ))}
              </TextWrap>
              <TextWrap>
                <div>
                  <OrderList ordereditem={item} />
                </div>
              </TextWrap>
            </PicWrap>
            <PicWrap>
              <ItemWrap>
                <ItemImg alt="orderitem" src="/image/bottega2.jpg" />
              </ItemWrap>
            </PicWrap>
            <Line widthLength="120vh" />

            <TextWrap>
              <PersonalOrderInnerText>총{item.length}개</PersonalOrderInnerText>
            </TextWrap>
            <TextWrap>
              <PersonalOrderInnerText>KRW</PersonalOrderInnerText>
            </TextWrap>
            <div>
              <StyledButton onClick={handleSubmit} padding="10vh">
                결제하기
              </StyledButton>
            </div>
          </OrderCard>
        </CardWrap>
      </InlineWrap>
    </Wrap>
  );
}

export default OrderPage;
