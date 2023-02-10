//회원정보 조회 & 수정 & 탈퇴

import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function MyInfoList({ datas }) {
  const [btnState, setBtnState] = useState('정보수정하기');
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [inputValue, setInputValue] = useState(datas);

  const pwValidation = e => {
    setBtnState('변경사항 저장하기');
    let pw = e.target.value;
    setInputValue({ ...inputValue, password: pw });
    pw.length > 5 ? setPwMsg('') : setPwMsg('비밀번호를 6자이상 입력해주세요.');
  };

  const emailValidation = e => {
    setBtnState('변경사항 저장하기');
    let email = e.target.value;
    setInputValue({ ...inputValue, email: email });
    email.includes('@') && email.includes('.')
      ? setEmailMsg('')
      : setEmailMsg('이메일을 확인해주세요');
  };

  const inputhandler = e => {
    setBtnState('변경사항 저장하기');
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // 회원정보 업데이트
  const handleUpdateInfo = e => {
    e.preventDefault();
    btnState === '변경사항 저장하기' && alert('회원정보가 변경되었습니다.');
    axios
      .patch(`http://localhost:5001/user/${datas.id}`, inputValue)
      .then(res => alert(res.response.data.message));
  };

  // 회원정보 삭제
  const handleDeleteInfo = () => {
    axios
      .delete(`http://localhost:5001/user/${datas.id}`)
      .then(res => alert(res.data.message));
  };

  return (
    <Container>
      <MyInfos>
        <form onSubmit={handleUpdateInfo}>
          <div>
            <label htmlFor="email">이메일</label>
            <div className="form-field">
              <input
                required
                id="email"
                type="email"
                name="email"
                value={inputValue.email}
                onChange={emailValidation}
                onBlur={() => {
                  setEmailMsg('');
                }}
              />
              {emailMsg && <p className="error-msg">{emailMsg}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <div className="form-field">
              <input
                required
                id="password"
                type="password"
                name="password"
                value={inputValue.password}
                onChange={pwValidation}
                onBlur={() => {
                  setPwMsg('');
                }}
              />
              {pwMsg && <p className="error-msg">{pwMsg}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="name">이름</label>
            <div className="form-field">
              <input
                required
                id="name"
                type="text"
                name="name"
                value={inputValue.name}
                onChange={inputhandler}
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact">연락처</label>
            <div className="form-field">
              <input
                required
                id="contact"
                type="text"
                name="contact"
                value={inputValue.contact}
                onChange={inputhandler}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address">주소</label>
            <div className="form-field">
              <input
                required
                id="address"
                type="text"
                name="address"
                value={inputValue.address}
                onChange={inputhandler}
              />
            </div>
          </div>
          <StyledButton>{btnState}</StyledButton>
        </form>
        <button className="delete-info-btn" onClick={handleDeleteInfo}>
          회원 탈퇴
        </button>
      </MyInfos>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: rgba(153, 164, 151, 1);
  color: rgb(59, 59, 59);
  font-size: 13px;
  font-weight: 600;
  width: 70%;
  border: none;
  border-radius: 15px;
  padding-block: 10px;
  text-align: center;
  transition: 0.25s;
  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
`;
const MyInfos = styled.div`
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  height: 500px;
  width: 60%;
  border-radius: 20px;
  background-color: #efefef;
  font-size: 13px;

  .error-msg {
    color: red;
    font-size: 10.5px;
    padding-top: 5px;
  }

  > form {
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 70%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > .form-field {
        width: 70%;
        > input {
          border: hidden;
          width: 100%;
          border-bottom-style: groove;
          background-color: inherit;
        }
      }
    }
  }
`;
