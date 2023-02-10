import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import banner from '../../images/banner.png';
import ProductDetailFooter from './ProductDetailFooter';

export default function ProductDetail() {
  const { productId } = useParams();
  const [info, setInfo] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5001/product/${productId}`).then(res => {
      setInfo(res.data);
    });
  }, []);

  // useEffect(() => {
  //   axios.get('/data/ProductDetail.json').then(res => {
  //     setInfo(res.data);
  //   });
  // }, []);

  const addItemToCart = () => {
    localStorage.setItem('cart', JSON.stringify([info]));
    let result = window.confirm('장바구니로 이동하시겠습니까?');
    if (result) {
      navigate('/cart');
    } else {
      console.log('취소 되었습니다.');
    }
  };

  return (
    <Container>
      <ProductSummary>
        <div className="product-img">
          <img
            src={info && `http://localhost:5001/uploads/${info._id}.png`}
            alt="product-Img"
          />
        </div>
        <div className="product-detail-all">
          <div className="product-detail-basic">
            <p className="product-brand">{info && info.company}</p>
            <p className="product-name">{info && info.name}</p>
            <p className="product-price">
              ₩
              {info &&
                info.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
          </div>
          <div className="product-select-size">
            사이즈를 선택해주세요
            <ArrowDropDownIcon />
          </div>
          <div className="buttons">
            <button className="btn-admin-only">변경사항 저장하기</button>
            <button onClick={addItemToCart}>장바구니</button>
          </div>
        </div>
      </ProductSummary>
      <hr />
      <OrderInfo>
        <p>구매 정보</p>
        <div className="order-infos">
          <div className="order-info">
            <span>배송비</span>
            <span>관부가세</span>
            <span>반품/교환</span>
          </div>
          <div className="order-info">
            <span>무료배송</span>
            <span>없음</span>
            <span>수령후 반품/교환 가능</span>
          </div>
        </div>
      </OrderInfo>
      <OrderInfo>
        <p>상품 정보</p>
        <div className="order-infos">
          <div className="order-info">
            <span>검수사진</span>
            <span>상품코드</span>
            <span>상품명</span>
          </div>
          <div className="order-info">
            <span>검수사진 미제공</span>
            <span>{info && info._id} </span>
            <span>{info && info.name}</span>
          </div>
        </div>
      </OrderInfo>
      <Image>
        <img src={banner} alt="salebanner" />
      </Image>
      <Summary>
        <p>{info && info.company}</p>
        <h2>{info && info.name}</h2>
        <h3>{info && info.description} </h3>
      </Summary>
      <Image>
        <img
          className="product-image"
          src={info && info.image}
          alt="productImg"
        />
      </Image>
      <ProductDetailFooter />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  margin-top: 90px;
  padding: 40px;
  > hr {
    border: 1px solid lightgray;
  }
`;

const ProductSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 90px;
  height: 500px;
  width: 100%;

  > .product-img {
    height: 100%;
    width: 30%;
    > img {
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
  }

  > .product-detail-all {
    height: 100%;
    width: 75%;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > .product-detail-basic {
      text-align: center;
      height: 45%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      > .product-brand {
        font-size: 50px;
        color: #a6a6a6;
      }
      > .product-name {
        font-size: 70px;
        font-weight: 600;
      }
      > .product-price {
        font-size: 30px;
        font-weight: 300;
      }
    }
    > .product-select-size {
      background-color: lightgray;
      display: flex;
      justify-content: center;
      align-items: center;
      color: gray;
      height: 10%;
      width: 60%;
      font-size: 18px;
      font-weight: 300;
    }
    > .buttons {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      > button {
        height: 50%;
        width: 40%;
        font-size: 18px;
        border-radius: 20px;
        font-weight: 600;
        border: none;
        background-color: #cad0c8;
      }
      > .btn-admin-only {
        background-color: rgba(153, 164, 151, 1);
      }
    }
  }
`;

const OrderInfo = styled.div`
  width: 100vw;
  margin: 80px 0px;
  > p {
    font-weight: 700;
    font-size: 20px;
  }
  > .order-infos {
    width: 350px;
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    color: gray;
    font-weight: 600;
    > .order-info {
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

const Summary = styled.div`
  width: 100vw;
  margin: 250px 0px 0px 0px;
  > p {
    font-weight: 900;
    font-size: 40px;
    color: gray;
    margin-bottom: 30px;
  }
  > h2 {
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 10px;
  }
`;

const Image = styled.div`
  width: 100%;
  margin-top: 120px;
  > img {
    display: block;
    width: 60%;
    margin: 20px auto;
    height: 180px;
  }
  > .product-image {
    width: 100%;
    height: 1500px;
  }
`;
