import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function ShowProduct({ datas }) {
  const navigate = useNavigate();
  return (
    <ProductLists>
      {datas.map(el => (
        <ProductInfo
          key={el._id}
          onClick={() => {
            navigate(`/product/${el._id}`);
          }}
        >
          <img
            className="product-image"
            src={`http://localhost:5001/uploads/${el._id}.png`}
            alt="product-Img"
          />
          <p className="product-brand">{el.brand}</p>
          <p className="product-name">{el.name}</p>
          <p className="product-price">
            <span className="sale-percentage">30%</span>
            {el.price}
          </p>
          <p className="delivery-info">익일배송</p>
        </ProductInfo>
      ))}
    </ProductLists>
  );
}

const ProductLists = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  padding: 10px;
`;

const ProductInfo = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 400px;
  font-size: 15px;
  > .product-image {
    width: 100%;
    height: 70%;
    object-fit: contain;
  }
  > .product-name {
    font-weight: 500;
    color: #b2b8bd;
  }

  > .product-price {
    > .sale-percentage {
      color: #883df7;
      margin-right: 8px;
    }
  }
  > .delivery-info {
    font-weight: 300;
    font-size: 10px;
    padding: 5px;
    background-color: #f7f8f9;
  }
`;
