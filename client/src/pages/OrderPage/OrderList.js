import React from 'react';

function OrderList({ ordereditem }) {
  return (
    <div>
      {ordereditem.map(i => (
        <div key={i}>
          <p>상품명 : {i.name}</p>
          <p>브랜드: {i.brand}</p>
          <p>상품 가격: {i.price}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
