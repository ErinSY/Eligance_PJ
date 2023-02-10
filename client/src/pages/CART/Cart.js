import React, { useState } from 'react';
import styled from 'styled-components';

function ProductItem({
  id,
  name,
  price,
  image,
  count,
  setProductList,
  setCheckItems,
  checkItems,
}) {
  const [productCount, setProductCount] = useState(1);
  const handleDelete = () => {
    setProductList(prev => prev.filter(product => product._id !== id));
  };

  const handleCount = e => {
    setProductCount(e.target.value);
    setProductList(prev =>
      prev.map(product => {
        if (product._id === id) {
          return { ...product, count: Number(e.target.value) };
        } else {
          return product;
        }
      })
    );
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  return (
    <Container>
      <Item>
        <Check
          type="checkbox"
          checked={checkItems.includes(id)}
          onChange={e => {
            handleSingleCheck(e.target.checked, id);
          }}
        />
      </Item>
      <Item>
        <ProductImage
          src={`http://localhost:5001/uploads/${id}.png`}
          alt={name}
        />
      </Item>
      <Item>{name}</Item>
      <Item>
        <Count
          type="number"
          value={productCount}
          onChange={handleCount}
          min={0}
        />
      </Item>
      <Item>FREE</Item>
      <Item>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Item>
      <Item>
        <StyledButton onClick={handleDelete}>삭제</StyledButton>
      </Item>
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;
`;

const Item = styled.li`
  font-size: 17px;
  font-weight: 400;
  width: 140px;
  text-align: center;
`;
const Check = styled.input`
  zoom: 1.5;
`;
const ProductImage = styled.img`
  width: 122px;
  height: 122px;
  text-align: center;
`;
const Count = styled.input`
  width: 42px;
  font-size: 20px;
  zoom: 1.2;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: rgba(153, 164, 151, 1);
  color: rgb(59, 59, 59);
  font-size: 18px;
  font-weight: 500;
  border: none;
  width: 80px;
  border-radius: 15px;
  padding-block: 5px;
  text-align: center;
  transition: 0.25s;
  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
`;
export default ProductItem;
