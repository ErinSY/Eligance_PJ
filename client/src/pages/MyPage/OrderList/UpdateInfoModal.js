import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function UpdateInfoModal({ setIsToUpdate, orderId }) {
  const [inputValue, setInputValue] = useState({
    phone: '',
    address: '',
  });

  const inputhandler = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  console.log(inputValue);

  const submitHandler = () => {
    alert('수정이 완료되었습니다');
    axios.patch(`http://localhost:5001/order/${orderId}`, inputValue);
    setIsToUpdate(false);
  };
  return (
    <Modal>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="address">주소</label>
          <div className="form-field">
            <input
              required
              id="address"
              type="text"
              name="address"
              onChange={inputhandler}
              placeholder="새로운 배송지 주소를 입력해주세요"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone">연락처</label>
          <div className="form-field">
            <input
              required
              id="phone"
              type="text"
              name="phone"
              onChange={inputhandler}
              placeholder="배송받으실 분의 연락처를 입력해주세요"
            />
          </div>
        </div>
        <StyledButton>수정완료</StyledButton>
      </form>
    </Modal>
  );
}

const Modal = styled.div`
  position: absolute;
  top: 700px;
  right: 320px;
  width: 800px;
  height: 500px;
  margin: 30px 0px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > form {
    margin-top: 20px;
    padding: 15px;
    height: 180px;
    width: 50%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > div {
      display: flex;
      width: 400px;
      flex-direction: row;
      justify-content: space-around;
      align-items: space-around;
      > label {
        font-weight: 900;
      }
      > .form-field {
        > input {
          width: 300px;
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
  height: 35px;
  padding: 5px;
  width: 150px;
  text-align: center;
  transition: 0.25s;
  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
`;
