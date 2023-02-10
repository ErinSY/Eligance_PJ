import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  // 에러메세지 표시 변수
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [confirmPwMsg, setConfirmPwMsg] = useState('');

  const navigate = useNavigate();

  // input 값 받아오기
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    contact: '',
    address: '',
  });
  const { email, password, confirmPassword, name, contact, address } =
    inputValue;

  // 유효성확인_버튼활성화
  const activateButton =
    name.length >= 2 &&
    password.length >= 6 &&
    confirmPassword === password &&
    email.includes('@' && '.com') &&
    name.length >= 1 &&
    address.length >= 1 &&
    contact.length >= 1;

  // 유효성검사_에러메세지
  const emailValidation = e => {
    let email = e.target.value;
    setInputValue({ ...inputValue, email: email });
    email.includes('@') && email.includes('.')
      ? setEmailMsg('')
      : setEmailMsg('이메일을 확인해주세요');
  };

  const pwValidation = e => {
    let pw = e.target.value;
    setInputValue({ ...inputValue, password: pw });
    pw.length > 5 ? setPwMsg('') : setPwMsg('비밀번호를 6자이상 입력해주세요.');
  };

  const confirmPwValidation = e => {
    let confirmPw = e.target.value;
    setInputValue({ ...inputValue, confirmPassword: confirmPw });
    confirmPw === password
      ? setConfirmPwMsg('')
      : setConfirmPwMsg('비밀번호가 일치하지 않습니다.');
  };

  const inputhandler = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSignup = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/user/signup', {
        email: email,
        name: name,
        password: password,
        address: address,
        contact: contact,
      })
      .then(res => {
        alert(res.data.message);
        console.log(res);
        navigate('/user/login');
      })
      .catch(error => {
        console(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label htmlFor="email">이메일</label>
        <div className="form-field">
          <input
            required
            id="email"
            type="email"
            name="email"
            onChange={emailValidation}
            onBlur={() => {
              setEmailMsg('');
            }}
            placeholder="abc@elice.com"
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
            onBlur={() => {
              setPwMsg('');
            }}
            onChange={pwValidation}
            placeholder="************"
          />
          {pwMsg && <p className="error-msg">{pwMsg}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <div className="form-field">
          <input
            required
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onBlur={() => {
              setConfirmPwMsg('');
            }}
            onChange={confirmPwValidation}
            placeholder="************"
          />
          {confirmPwMsg && <p className="error-msg">{confirmPwMsg}</p>}
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
            onChange={inputhandler}
            placeholder="엘리스"
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
            onChange={inputhandler}
            placeholder="휴대폰번호를 입력해주세요"
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
            onChange={inputhandler}
            placeholder="주소를 입력해주세요"
          />
        </div>
      </div>
      <button className="sign-up-btn " disabled={!activateButton} type="submit">
        이메일로 회원가입
      </button>
    </form>
  );
}
